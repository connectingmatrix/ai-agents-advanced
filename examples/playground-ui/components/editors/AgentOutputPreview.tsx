import { BarChart3, FileSpreadsheet } from 'lucide-react';
import { renderMarkdown } from './renderMarkdown';
import { MermaidPreview } from './MermaidPreview';

type AgentOutputPart = { body: string; kind: 'markdown' | 'chart' | 'excel' | 'mermaid'; raw: string };
type ChartValue = { label: string; value: number };
type ExcelSheet = { name: string; rows: string[][] };

type AgentOutputPreviewProps = {
    className?: string;
    content: string;
};

const previewPattern = /(\[\[(chart|charts|excel):([^\]]+)\]\]|\[(charts?|excel|mermaid)\]([\s\S]*?)\[\/\4\]|```mermaid\s*([\s\S]*?)```)/gi;

const splitAgentOutput = (content: string): AgentOutputPart[] => {
    const parts: AgentOutputPart[] = [];
    let cursor = 0;
    for (const match of content.matchAll(previewPattern)) {
        const index = match.index || 0;
        if (index > cursor) parts.push({ kind: 'markdown', body: content.slice(cursor, index), raw: content.slice(cursor, index) });
        const inlineKind = match[2]?.toLowerCase();
        const blockKind = match[4]?.toLowerCase();
        const kind = inlineKind === 'excel' || blockKind === 'excel' ? 'excel' : blockKind === 'mermaid' || match[6] !== undefined ? 'mermaid' : 'chart';
        const body = (match[3] || match[5] || match[6] || '').trim();
        parts.push({ kind, body, raw: match[0] });
        cursor = index + match[0].length;
    }
    if (cursor < content.length) parts.push({ kind: 'markdown', body: content.slice(cursor), raw: content.slice(cursor) });
    return parts.filter((part) => part.kind !== 'markdown' || part.body.trim());
};

const parseJson = (body: string): unknown | null => {
    try {
        return JSON.parse(body);
    } catch {
        return null;
    }
};

const firstNonEmpty = <T,>(...items: T[][]): T[] => items.find((item) => item.length > 0) || [];

const stringifyCell = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

const normalizeRows = (rows: unknown): string[][] =>
    Array.isArray(rows)
        ? rows
              .filter((row) => Array.isArray(row))
              .map((row) => (row as unknown[]).map(stringifyCell))
              .filter((row) => row.some(Boolean))
              .slice(0, 10)
        : [];

const rowsFromObjectArray = (rows: unknown): string[][] => {
    if (!Array.isArray(rows) || !rows.every((row) => row && typeof row === 'object' && !Array.isArray(row))) return [];
    const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row as Record<string, unknown>)))).slice(0, 8);
    if (!keys.length) return [];
    return [keys, ...rows.slice(0, 9).map((row) => keys.map((key) => stringifyCell((row as Record<string, unknown>)[key])))];
};

const parseCsvRows = (body: string): string[][] => {
    const parsed = parseJson(body);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const record = parsed as Record<string, unknown>;
        const firstSheet = Array.isArray(record.sheets) ? (record.sheets[0] as Record<string, unknown> | undefined) : undefined;
        const candidateRows = firstNonEmpty(normalizeRows(record.rows), normalizeRows(record.data), normalizeRows(firstSheet?.rows));
        if (candidateRows.length) return candidateRows;
        const objectRows = firstNonEmpty(rowsFromObjectArray(record.rows), rowsFromObjectArray(record.data), rowsFromObjectArray(firstSheet?.rows));
        if (objectRows.length) return objectRows;
    }
    if (Array.isArray(parsed)) {
        const candidateRows = firstNonEmpty(normalizeRows(parsed), rowsFromObjectArray(parsed));
        if (candidateRows.length) return candidateRows;
    }
    const rows = body
        .trim()
        .split(/\r?\n/)
        .map((line) => line.split(',').map((cell) => cell.trim()))
        .filter((row) => row.some(Boolean));
    return rows.length > 1 && rows[0].length > 1 ? rows.slice(0, 10) : [];
};

const chartValue = (entry: unknown, index: number): ChartValue | null => {
    if (typeof entry === 'number') return { label: `Item ${index + 1}`, value: entry };
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return null;
    const record = entry as Record<string, unknown>;
    const value = Number(record.value ?? record.y ?? record.count ?? record.score ?? record.weight ?? record.metric ?? 0);
    if (!Number.isFinite(value)) return null;
    return { label: String(record.label ?? record.name ?? record.key ?? record.feature ?? record.metric ?? `Item ${index + 1}`), value };
};

const valuesFromArray = (value: unknown): ChartValue[] =>
    Array.isArray(value) ? value.map(chartValue).filter((entry): entry is ChartValue => !!entry) : [];

const parseChartValues = (body: string): ChartValue[] => {
    const parsed = parseJson(body);
    if (Array.isArray(parsed)) return valuesFromArray(parsed);
    if (parsed && typeof parsed === 'object') {
        const record = parsed as Record<string, unknown>;
        const nested = firstNonEmpty(valuesFromArray(record.series), valuesFromArray(record.data), valuesFromArray(record.values), valuesFromArray(record.points));
        if (nested.length) return nested;
        return Object.entries(record)
            .filter(([, value]) => typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))))
            .map(([label, value]) => ({ label, value: Number(value) }))
            .filter((entry) => Number.isFinite(entry.value));
    }
    return [];
};

const columnName = (index: number): string => {
    let n = index + 1;
    let output = '';
    while (n > 0) {
        const rem = (n - 1) % 26;
        output = String.fromCharCode(65 + rem) + output;
        n = Math.floor((n - 1) / 26);
    }
    return output;
};

const parseExcelSheets = (body: string): ExcelSheet[] => {
    const parsed = parseJson(body);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const record = parsed as Record<string, unknown>;
        if (Array.isArray(record.sheets)) {
            const sheets = record.sheets
                .map((sheet, index) => {
                    const row = sheet && typeof sheet === 'object' ? (sheet as Record<string, unknown>) : {};
                    const rows = firstNonEmpty(normalizeRows(row.rows), normalizeRows(row.data), rowsFromObjectArray(row.rows), rowsFromObjectArray(row.data));
                    return rows.length ? { name: stringifyCell(row.name || row.title || `Sheet ${index + 1}`), rows } : null;
                })
                .filter((sheet): sheet is ExcelSheet => !!sheet);
            if (sheets.length) return sheets;
        }
    }
    const rows = parseCsvRows(body);
    return rows.length ? [{ name: 'Sheet1', rows }] : [];
};

function ExcelPreview({ body }: { body: string }) {
    const sheets = parseExcelSheets(body);
    const firstSheet = sheets[0];
    const rows = firstSheet?.rows || [];
    const columnCount = Math.max(...rows.map((row) => row.length), 1);
    return (
        <div className="my-3 overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 text-sm shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between gap-3 border-b border-emerald-200 px-3 py-2 font-semibold text-emerald-900 dark:border-emerald-900/60 dark:text-emerald-100">
                <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel viewer
                </div>
                <span className="text-xs font-normal text-emerald-800/70 dark:text-emerald-100/70">{rows.length} rows · {columnCount} columns</span>
            </div>
            {rows.length ? (
                <>
                    <div className="max-h-80 overflow-auto bg-white dark:bg-[#101010]">
                        <table className="min-w-full border-collapse text-left text-xs">
                            <thead className="sticky top-0 z-10 bg-emerald-100 dark:bg-emerald-950">
                                <tr>
                                    <th className="sticky left-0 z-20 w-10 border-b border-r border-emerald-200 px-2 py-1 text-center font-medium text-emerald-900 dark:border-emerald-900 dark:text-emerald-100">#</th>
                                    {Array.from({ length: columnCount }).map((_, index) => (
                                        <th key={index} className="min-w-28 border-b border-r border-emerald-200 px-2 py-1 text-center font-medium text-emerald-900 dark:border-emerald-900 dark:text-emerald-100">
                                            {columnName(index)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={`${rowIndex}-${row.join('|')}`} className={rowIndex === 0 ? 'font-semibold' : ''}>
                                        <th className="sticky left-0 bg-emerald-50 px-2 py-1 text-center font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">{rowIndex + 1}</th>
                                        {Array.from({ length: columnCount }).map((_, cellIndex) => (
                                            <td key={`${cellIndex}-${row[cellIndex] || ''}`} className="border-b border-r border-emerald-100 px-2 py-1 dark:border-emerald-900/50">
                                                {row[cellIndex] || ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-1 border-t border-emerald-200 bg-emerald-50 px-2 py-1 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                        {sheets.map((sheet, index) => (
                            <span key={`${sheet.name}-${index}`} className={`rounded-t px-3 py-1 text-xs ${index === 0 ? 'bg-white font-semibold text-emerald-900 dark:bg-[#101010] dark:text-emerald-100' : 'text-emerald-800 dark:text-emerald-200'}`}>
                                {sheet.name}
                            </span>
                        ))}
                    </div>
                </>
            ) : (
                <pre className="m-3 max-h-40 overflow-auto rounded-lg bg-white p-2 text-xs dark:bg-[#101010] dark:text-gray-200">{body || 'Spreadsheet artifact'}</pre>
            )}
        </div>
    );
}

function ChartPreview({ body }: { body: string }) {
    const values = parseChartValues(body);
    const max = Math.max(...values.map((entry) => Math.abs(entry.value)), 1);
    return (
        <div className="my-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-900/60 dark:bg-blue-950/20">
            <div className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-100">
                <BarChart3 className="h-4 w-4" />
                Chart preview
            </div>
            {values.length ? (
                <div className="space-y-2">
                    {values.slice(0, 8).map((entry) => (
                        <div key={entry.label} className="grid grid-cols-[100px,1fr,48px] items-center gap-2 text-xs">
                            <span className="truncate dark:text-gray-200">{entry.label}</span>
                            <div className="h-2 rounded-full bg-white dark:bg-[#111111]">
                                <div className="h-2 rounded-full bg-current text-blue-500" style={{ width: `${Math.max(5, (Math.abs(entry.value) / max) * 100)}%` }} />
                            </div>
                            <span className="text-right dark:text-gray-300">{entry.value}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <pre className="max-h-40 overflow-auto rounded-lg bg-white p-2 text-xs dark:bg-[#101010] dark:text-gray-200">{body || 'Chart artifact'}</pre>
            )}
        </div>
    );
}

export function AgentOutputPreview({ content, className = '' }: AgentOutputPreviewProps) {
    const parts = splitAgentOutput(content);
    if (!parts.length) return null;
    return (
        <div className={className}>
            {parts.map((part, index) => {
                if (part.kind === 'chart') return <ChartPreview key={`${index}-${part.raw}`} body={part.body} />;
                if (part.kind === 'excel') return <ExcelPreview key={`${index}-${part.raw}`} body={part.body} />;
                if (part.kind === 'mermaid') return <MermaidPreview key={`${index}-${part.raw}`} body={part.body} />;
                return <div key={`${index}-${part.raw}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(part.body) }} />;
            })}
        </div>
    );
}
