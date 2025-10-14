export const formatPhoneNumber = (value: string, prev: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (value.length > 18) return prev;

  let formatted = numbers;
  if (!formatted.startsWith('7') && formatted.length > 0) {
    formatted = '7' + formatted;
  }
  
  if (formatted.length > 0) {
    formatted = '+' + formatted;
  }
  if (formatted.length > 2) {
    formatted = formatted.substring(0, 2) + ' (' + formatted.substring(2);
  }
  if (formatted.length > 7) {
    formatted = formatted.substring(0, 7) + ') ' + formatted.substring(7);
  }
  if (formatted.length > 12) {
    formatted = formatted.substring(0, 12) + '-' + formatted.substring(12);
  }
  if (formatted.length > 15) {
    formatted = formatted.substring(0, 15) + '-' + formatted.substring(15);
  }
  
  return formatted;
};