const platformBrandPattern = /\b(?:giga\s+ai|giga\s+intelligence|giga)\b/gi;

export const neutralizeGeneratedBranding = (value: string): string => {
  const cleaned = value.replace(platformBrandPattern, 'Application Studio').replace(/\s+/g, ' ').trim();
  return cleaned || 'Generated application';
};

export const generatedContentHasPlatformBranding = (value: string): boolean => platformBrandPattern.test(value);
