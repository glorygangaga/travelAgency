export function OnlyNumbers(str: string, prev: string): string {
  if (str.length > 11) return prev;
  const res = str.replace(/\D/g, '');
  return res;
}

export function GetNumbersFromString(str?: string | null): string | undefined {
  if (!str) return undefined;
  return str.replace(/\D/g, '');
};