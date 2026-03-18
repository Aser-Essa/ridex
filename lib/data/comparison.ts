export interface ComparisonRow {
  feature: string;
  ridex: string;
  brandA: string;
  brandB: string;
  brandC: string;
  isCheck?: boolean; // Determines if the value is a check/cross mark representation
}

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: 'Range per charge', ridex: '340km', brandA: '280km', brandB: '210km', brandC: '190km' },
  { feature: 'Top Speed', ridex: '45km/h', brandA: '40km/h', brandB: '38km/h', brandC: '35km/h' },
  { feature: 'Frame material', ridex: 'T1000', brandA: 'T700', brandB: 'Aluminium', brandC: 'Steel' },
  { feature: 'AI Battery management', ridex: '✓', brandA: '✗', brandB: '✗', brandC: '✗', isCheck: true },
  { feature: 'Regen Braking', ridex: '✓', brandA: '✓', brandB: '✗', brandC: '✗', isCheck: true },
  { feature: 'Smart App', ridex: '✓', brandA: 'Limited', brandB: '✗', brandC: '✗', isCheck: true },
  { feature: 'Warranty', ridex: '5 years', brandA: '2 years', brandB: '1 year', brandC: '1 year' },
  { feature: 'OTA Updates', ridex: '✓', brandA: '✗', brandB: '✗', brandC: '✗', isCheck: true },
  { feature: 'Weight', ridex: '9.2kg', brandA: '11.4kg', brandB: '13.8kg', brandC: '15.2kg' },
  { feature: 'Starting price', ridex: '$3,299', brandA: '$2,899', brandB: '$1,999', brandC: '$1,299' }
];
