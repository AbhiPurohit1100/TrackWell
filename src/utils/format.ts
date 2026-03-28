export const formatRange = (range: [number, number] | null, unit = '') => {
  if (!range) return 'n/a';
  const [low, high] = range;
  return `${low.toFixed(1)}${unit} – ${high.toFixed(1)}${unit}`;
};

export const formatNumber = (value: number | null, unit = '') => {
  if (value === null || Number.isNaN(value)) return 'n/a';
  return `${value.toFixed(1)}${unit}`;
};
