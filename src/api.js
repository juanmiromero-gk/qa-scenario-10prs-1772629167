/**
 * API Client module
 * Provides a lightweight HTTP client wrapper for external API calls.
 */

const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

function buildQueryString(params) {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

function buildUrl(base, path, params = {}) {
  const query = Object.keys(params).length ? '?' + buildQueryString(params) : '';
  return `${base}${path}${query}`;
}

module.exports = { get, buildQueryString, buildUrl };
