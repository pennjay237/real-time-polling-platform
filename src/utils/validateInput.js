/**
 * Validates a given input value based on a set of rules.
 * @param {string} value The input value to validate.
 * @param {object} rules An object containing validation rules (e.g., { required: true, minLength: 5 }).
 * @returns {string|null} An error message if validation fails, otherwise null.
 */
export const validateInput = (value, rules) => {
  if (rules.required && (value === null || value.trim() === '')) {
    return 'This field is required.';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters long.`;
  }

  // You can add more validation rules here (e.g., email, number, etc.)
  if (rules.isEmail && !/^\S+@\S+\.\S+$/.test(value)) {
    return 'Please enter a valid email address.';
  }

  return null; // No validation errors
};