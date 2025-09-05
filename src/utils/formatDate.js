/**
 * Formats a Date object into a readable string.
 * @param {Date} date The Date object to format.
 * @returns {string} The formatted date string (e.g., "Oct 26, 2024").
 */
export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date provided to formatDate.');
    return '';
  }

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};