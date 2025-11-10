export function OnlyNumbers(str: string, prev: string): string {
  if (str.length > 11) return prev;
  const res = str.replace(/\D/g, '');
  return res;
}

export function OnlyNumbersWithDelim(str: string, prev: string, min: number, max: number): string {
  if (str.length > 11) return prev;
  const res = str.replace(/\D/g, '');
  if (min > +res || max < +res) return prev;
  return res;
}

export function GetNumbersFromString(str?: string | null): string | undefined {
  if (!str) return undefined;
  return str.replace(/\D/g, '');
};

export function OnlyNumbersWithMax(str: string, max: number): number {
  const res = str.replace(/\D/g, '');
  if (max < +res) return max;
  return +res;
}