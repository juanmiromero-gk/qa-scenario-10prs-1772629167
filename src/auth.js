/**
 * Authentication module
 * Handles user login, logout, and session management.
 */

const sessions = new Map();

function login(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  // Simulate credential check (replace with real DB lookup)
  if (password.length < 6) {
    return { success: false, error: 'Invalid credentials' };
  }
  const token = `token_${username}_${Date.now()}`;
  sessions.set(token, { username, createdAt: new Date() });
  return { success: true, token };
}

function logout(token) {
  if (!sessions.has(token)) {
    return { success: false, error: 'Session not found' };
  }
  sessions.delete(token);
  return { success: true };
}

function validateSession(token) {
  return sessions.has(token);
}

module.exports = { login, logout, validateSession };
