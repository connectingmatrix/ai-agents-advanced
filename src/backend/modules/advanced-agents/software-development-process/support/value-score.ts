import type { SoftwareProcessMatrices, SoftwareValueScore } from '../contracts/matrix-types';

export const defaultValueScore = (capsApplied: string[] = []): SoftwareValueScore => {
  const uncapped = {
    functionalCompleteness: 25,
    backendWiring: 20,
    uiKitCompliance: 15,
    rbacAuthCorrectness: 15,
    stateCoverage: 10,
    testingVerification: 10,
    maintainabilityDocs: 5,
  };
  let total = Object.values(uncapped).reduce((sum, value) => sum + value, 0);
  if (capsApplied.includes('crud_without_backend')) total = Math.min(total, 60);
  if (capsApplied.includes('admin_without_backend_rbac')) total = Math.min(total, 60);
  if (capsApplied.includes('unwired_buttons_or_forms')) total = Math.min(total, 65);
  if (capsApplied.includes('checks_not_attempted')) total = Math.min(total, 70);
  if (capsApplied.includes('ui_kit_ignored')) total = Math.min(total, 75);
  if (capsApplied.includes('missing_completion_checklist')) total = Math.min(total, 80);
  if (capsApplied.includes('missing_final_docs')) total = Math.min(total, 85);
  return { ...uncapped, total, capsApplied, verdict: total >= 90 ? 'complete' : total >= 70 ? 'partial' : 'failed' };
};

export const processScoreCaps = (
  matrices: Pick<SoftwareProcessMatrices, 'crudOperationMatrix' | 'backendContractMatrix' | 'routeAuthRbacMatrix'>,
) => {
  const caps: string[] = [];
  if (matrices.crudOperationMatrix.length && !matrices.backendContractMatrix.length) caps.push('crud_without_backend');
  if (
    matrices.routeAuthRbacMatrix.some(
      (route) => route.access === 'protected' && route.allowedRoles.includes('super_admin') && route.backendGuard === 'none',
    )
  ) {
    caps.push('admin_without_backend_rbac');
  }
  return caps;
};
