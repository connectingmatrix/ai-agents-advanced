import {
    attachSubjectToCategoryNode,
    createCategoryNode,
    createChannelNode,
    createSubjectNode,
    fetchUserTree,
    linkCategoryNode,
    unlinkCategoryFromChannelNode,
    unlinkSubjectFromCategoryNode,
    type EntityListResult,
    type EntityMutationInput,
    type EntityName,
    type EntityRecord,
    type FetchUserTreeInput,
    type RelationName,
    type ScopeRef,
    type TreeRootType,
    type UiPermission,
    type UiTreeNode,
    type UiTreeResult
} from '@/orm';
import type { UiDataContext } from '@/dataloaders/context';
import { assertCanPerform, loadUiPermissions } from '@/dataloaders/permissions.loader';
import { invalidateTreeScopeCache } from '@/dataloaders/tree-scope.loader';

export type TreeListPage = { first?: number | null; offset?: number | null };
export type TreeLoaderResult = EntityListResult & { permissions: UiPermission[] };

const treeEntities: EntityName[] = ['Channel', 'Category', 'Subject', 'Post'];
const emptyTime = '';

const nodeRecord = (entity: EntityName, node: UiTreeNode, data = {}): EntityRecord => ({
    id: node.id,
    entity,
    title: node.name || node.id,
    subtitle: node.description || '',
    slug: node.slug || '',
    status: node.isGlobal ? 'global' : '',
    createdAt: emptyTime,
    updatedAt: emptyTime,
    data: { ...data, nodeType: node.nodeType, posts: node.posts, categoryCount: node.categoryCount || 0, subjectCount: node.subjectCount || 0, postCount: node.postCount || 0, childCount: node.childCount || 0 }
});

const postRecords = (node: UiTreeNode): EntityRecord[] =>
    node.posts.map((post) => ({
        id: post.id,
        entity: 'Post',
        title: post.title,
        subtitle: post.narrative || '',
        slug: '',
        status: '',
        createdAt: post.created_at || '',
        updatedAt: post.updated_at || post.created_at || '',
        data: { ...post, narrative: post.narrative || '', metadata: post.metadata || {} }
    }));

const flatten = (nodes: UiTreeNode[]): UiTreeNode[] => nodes.flatMap((node) => [node, ...flatten(node.children)]);
const allRoots = (tree: UiTreeResult): UiTreeNode[] => [...tree.user, ...tree.organization, ...tree.global];
const findNode = (tree: UiTreeResult, id: string): UiTreeNode | undefined => flatten(allRoots(tree)).find((node) => node.id === id);
const typedChildren = (node: UiTreeNode | undefined, nodeType: string): UiTreeNode[] => (node ? node.children.filter((child) => child.nodeType === nodeType) : []);
const channelRows = (tree: UiTreeResult): EntityRecord[] => [
    ...tree.user.filter((node) => node.nodeType === 'CHANNEL').map((node) => nodeRecord('Channel', node, { type: 'personal' })),
    ...tree.organization.filter((node) => node.nodeType === 'CHANNEL').map((node) => nodeRecord('Channel', node, { type: 'organization' })),
    ...tree.global.filter((node) => node.nodeType === 'CHANNEL').map((node) => nodeRecord('Channel', node, { type: 'global' }))
];
const rootTypeFor = (kind: ScopeRef['kind']): TreeRootType | null => (kind === 'channel' ? 'CHANNEL' : kind === 'category' ? 'CATEGORY' : kind === 'subject' ? 'SUBJECT' : null);
const rootTypeForEntity = (entity: EntityName): TreeRootType | null => (entity === 'Channel' ? 'CHANNEL' : entity === 'Category' ? 'CATEGORY' : entity === 'Subject' ? 'SUBJECT' : null);
const organizationId = (context: UiDataContext): string | null => (context.policy.scope.kind === 'organization' ? context.policy.scope.id : null);
const treeInput = (context: UiDataContext, rootId: string | null, rootType: TreeRootType | null, depth: number, includePosts: boolean, includeGlobal: boolean, page: TreeListPage = {}): FetchUserTreeInput => ({
    rootId,
    rootType,
    depth,
    includeCounts: true,
    includePosts,
    includeGlobal,
    organizationId: organizationId(context),
    first: page.first ?? null,
    offset: page.offset ?? null
});
const scopedTreeInput = (context: UiDataContext, entity: EntityName, scope: ScopeRef, page: TreeListPage = {}): FetchUserTreeInput => {
    if (entity === 'Channel') return treeInput(context, null, null, 0, false, true, page);
    const rootType = rootTypeFor(scope.kind);
    if (!rootType) throw new Error(`${entity} list requires a channel, category, or subject scope.`);
    return treeInput(context, scope.id, rootType, entity === 'Post' ? 0 : 1, entity === 'Post', false);
};

export const listTreeEntities = (): EntityName[] => treeEntities;

export const loadTreeGraph = async (context: UiDataContext): Promise<UiTreeResult> => {
    assertCanPerform(context.policy, 'Channel', 'list');
    return fetchUserTree(treeInput(context, null, null, 4, true, true));
};

export const loadTreeList = async (context: UiDataContext, entity: EntityName, scope: ScopeRef, search = '', page: TreeListPage = {}): Promise<TreeLoaderResult> => {
    assertCanPerform(context.policy, entity, 'list');
    const tree = await fetchUserTree(scopedTreeInput(context, entity, scope, page));
    const rows =
        entity === 'Channel'
            ? channelRows(tree)
            : entity === 'Category'
              ? typedChildren(findNode(tree, scope.id), 'CATEGORY').map((node) => nodeRecord('Category', node))
              : entity === 'Subject'
                ? typedChildren(findNode(tree, scope.id), 'SUBJECT').map((node) => nodeRecord('Subject', node))
                : findNode(tree, scope.id)
                  ? postRecords(findNode(tree, scope.id) as UiTreeNode)
                  : [];
    const filteredRows = search.trim() ? rows.filter((row) => row.title.toLowerCase().includes(search.trim().toLowerCase())) : rows;
    return { rows: filteredRows, count: filteredRows.length, permissions: loadUiPermissions(context.policy, entity) };
};

export const loadTreeRecord = async (context: UiDataContext, entity: EntityName, id: string): Promise<EntityRecord> => {
    assertCanPerform(context.policy, entity, 'read');
    if (entity === 'Post') return context.orm.entity('Post').single(id);
    const tree = await fetchUserTree(treeInput(context, id, rootTypeForEntity(entity), 0, false, true));
    const node = findNode(tree, id);
    if (!node) throw new Error(`${entity} ${id} was not found.`);
    return nodeRecord(entity, node as UiTreeNode);
};

export const createTreeRecord = async (context: UiDataContext, entity: EntityName, input: EntityMutationInput): Promise<EntityRecord> => {
    assertCanPerform(context.policy, entity, 'create');
    if (entity === 'Channel') {
        const record = nodeRecord('Channel', await createChannelNode(input));
        invalidateTreeScopeCache();
        return record;
    }
    if (entity === 'Category') {
        const record = nodeRecord('Category', await createCategoryNode(input));
        invalidateTreeScopeCache();
        return record;
    }
    if (entity === 'Subject') {
        const record = nodeRecord('Subject', await createSubjectNode(input), input.data);
        invalidateTreeScopeCache();
        return record;
    }
    const record = await context.orm.entity(entity).create(input);
    invalidateTreeScopeCache();
    return record;
};

export const updateTreeRecord = async (context: UiDataContext, entity: EntityName, id: string, input: EntityMutationInput): Promise<EntityRecord> => {
    assertCanPerform(context.policy, entity, 'update');
    const record = await context.orm.entity(entity).load(id).update(input);
    invalidateTreeScopeCache();
    return record;
};

export const linkTreeRecord = async (_context: UiDataContext, parentEntity: EntityName, parentId: string, relation: RelationName, childId: string): Promise<EntityRecord> => {
    if (parentEntity === 'Channel' && relation === 'categories') {
        await linkCategoryNode(parentId, childId);
        invalidateTreeScopeCache();
        return treeRecordById(_context, 'Category', childId);
    }
    if (parentEntity === 'Category' && relation === 'subjects') {
        await attachSubjectToCategoryNode(parentId, childId);
        invalidateTreeScopeCache();
        return treeRecordById(_context, 'Subject', childId);
    }
    throw new Error(`${parentEntity}.${relation}.link is not supported by the UI tree dataloader.`);
};

export const unlinkTreeRecord = async (context: UiDataContext, parentEntity: EntityName, parentId: string, relation: RelationName, childId: string): Promise<EntityRecord> => {
    if (parentEntity === 'Channel' && relation === 'categories') {
        await unlinkCategoryFromChannelNode(parentId, childId);
        invalidateTreeScopeCache();
        return treeRecordById(context, 'Category', childId);
    }
    if (parentEntity === 'Category' && relation === 'subjects') {
        await unlinkSubjectFromCategoryNode(parentId, childId);
        invalidateTreeScopeCache();
        return treeRecordById(context, 'Subject', childId);
    }
    throw new Error(`${parentEntity}.${relation}.unlink is not supported by the UI tree dataloader.`);
};

const treeRecordById = async (context: UiDataContext, entity: EntityName, id: string): Promise<EntityRecord> => {
    const tree = await fetchUserTree(treeInput(context, id, rootTypeForEntity(entity), 0, false, false));
    const node = findNode(tree, id);
    if (!node) throw new Error(`${entity} ${id} was not found after linking.`);
    return nodeRecord(entity, node);
};
