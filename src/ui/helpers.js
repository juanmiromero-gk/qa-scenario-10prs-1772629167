/**
 * UI Helper utilities
 * Functions for formatting and rendering data in the UI layer.
 */

function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function truncate(str, maxLength = 100) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dateStr, locale = 'en-US') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

module.exports = { formatCurrency, truncate, capitalize, formatDate, classNames };
