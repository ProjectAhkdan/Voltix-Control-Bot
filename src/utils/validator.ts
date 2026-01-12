export const isValidGameID = (id: string): boolean => {
  // Simple validation, can be enhanced regex based on game
  return id.length > 5;
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
