export const sparklineSvg = (seed: number) => {
  const y = [28, 20 + seed, 24, 12 + seed, 18, 8 + seed, 14];
  return `<svg data-ui-kit-component="SparklineChart" viewBox="0 0 140 52" aria-label="Trend sparkline"><path d="M0 50 L0 36 ${y
    .map((point, index) => `L${index * 22} ${point}`)
    .join(' ')} L140 44 L140 52 Z" fill="#0f766e22"></path><path d="M0 36 ${y
    .map((point, index) => `L${index * 22} ${point}`)
    .join(' ')} L140 44" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`;
};

export const donutSvg = (label: string, value: number) =>
  `<svg class="donut" data-ui-kit-component="SparklineChart" viewBox="0 0 120 120" aria-label="${label} donut chart"><circle cx="60" cy="60" r="44" fill="none" stroke="#dce7f0" stroke-width="16"/><circle cx="60" cy="60" r="44" fill="none" stroke="#0f766e" stroke-width="16" stroke-dasharray="${value} 276" transform="rotate(-90 60 60)"/><text x="60" y="64" text-anchor="middle" font-size="20" font-weight="800">${Math.round(
    value / 2.76,
  )}%</text></svg>`;

export const barRowsSvg = (items: string[]) =>
  `<svg data-ui-kit-component="SparklineChart" viewBox="0 0 420 180" aria-label="Report bar chart">${items
    .map(
      (item, index) =>
        `<text x="0" y="${26 + index * 34}" font-size="12">${item}</text><rect x="130" y="${12 + index * 34}" width="${
          160 + index * 42
        }" height="18" rx="9" fill="#0f766e" opacity="${0.5 + index * 0.1}"/>`,
    )
    .join('')}</svg>`;
