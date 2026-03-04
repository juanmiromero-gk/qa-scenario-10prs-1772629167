/**
 * Logger module
 * Structured logging with configurable log levels and output formatting.
 */

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

class Logger {
  constructor(name, level = 'INFO') {
    this.name = name;
    this.level = LOG_LEVELS[level] ?? LOG_LEVELS.INFO;
  }

  _log(levelName, message, meta = {}) {
    if (LOG_LEVELS[levelName] < this.level) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level: levelName,
      logger: this.name,
      message,
      ...meta,
    };
    const output = JSON.stringify(entry);
    if (levelName === 'ERROR') {
      console.error(output);
    } else {
      console.log(output);
    }
  }

  debug(message, meta) { this._log('DEBUG', message, meta); }
  info(message, meta)  { this._log('INFO',  message, meta); }
  warn(message, meta)  { this._log('WARN',  message, meta); }
  error(message, meta) { this._log('ERROR', message, meta); }
}

function createLogger(name, level) {
  return new Logger(name, level);
}

module.exports = { createLogger, Logger };
