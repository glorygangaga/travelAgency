export const formatPassportNumber = (value: string, prev: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (value.length > 12) return prev;

  let formatted = numbers;

  if (formatted.length > 2) {
    formatted = formatted.substring(0, 2) + ' ' + formatted.substring(2);
  }
  if (formatted.length > 5) {
    formatted = formatted.substring(0, 5) + ' ' + formatted.substring(5);
  }

  return formatted;
};