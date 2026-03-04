/**
 * Database abstraction layer
 * In-memory store with CRUD operations. Replace with a real DB adapter in production.
 */

class Database {
  constructor() {
    this.collections = {};
  }

  _getCollection(name) {
    if (!this.collections[name]) {
      this.collections[name] = [];
    }
    return this.collections[name];
  }

  insert(collection, document) {
    const col = this._getCollection(collection);
    const record = { id: col.length + 1, ...document, createdAt: new Date().toISOString() };
    col.push(record);
    return record;
  }

  findById(collection, id) {
    return this._getCollection(collection).find(r => r.id === id) || null;
  }

  findAll(collection) {
    return [...this._getCollection(collection)];
  }

  update(collection, id, updates) {
    const col = this._getCollection(collection);
    const index = col.findIndex(r => r.id === id);
    if (index === -1) return null;
    col[index] = { ...col[index], ...updates, updatedAt: new Date().toISOString() };
    return col[index];
  }

  delete(collection, id) {
    const col = this._getCollection(collection);
    const index = col.findIndex(r => r.id === id);
    if (index === -1) return false;
    col.splice(index, 1);
    return true;
  }
}

module.exports = new Database();
