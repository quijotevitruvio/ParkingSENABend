const DatabaseConnection = require('../DatabaseConnection');

class Celda {
  constructor(
    id = null,
    tipo = null,
    estado = null
  ) {
    this._id = id;
    this._tipo = tipo;
    this._estado = estado;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() { return this._id; }
  get tipo() { return this._tipo; }
  get estado() { return this._estado; }

  // Setters
  set id(value) { this._id = value; }
  set tipo(value) { this._tipo = value; }
  set estado(value) { this._estado = value; }

  // CREATE - Insert new parking cell
  async create() {
    try {
      const sql = `INSERT INTO CELDA (tipo, estado) VALUES (?, ?)`;
      
      const params = [this._tipo, this._estado];
      
      const result = await this._db.executeQuery(sql, params);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating Celda: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get cell by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM CELDA WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Celda: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all cells
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM CELDA';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const celda = new Celda();
        celda._mapRowToObject(row);
        return celda;
      });
    } catch (error) {
      throw new Error(`Error finding all Celda: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find cells by type
  static async findByTipo(tipo) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM CELDA WHERE tipo = ?';
      const result = await db.executeQuery(sql, [tipo]);
      
      return result.results.map(row => {
        const celda = new Celda();
        celda._mapRowToObject(row);
        return celda;
      });
    } catch (error) {
      throw new Error(`Error finding Celda by type: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find cells by status
  static async findByEstado(estado) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM CELDA WHERE estado = ?';
      const result = await db.executeQuery(sql, [estado]);
      
      return result.results.map(row => {
        const celda = new Celda();
        celda._mapRowToObject(row);
        return celda;
      });
    } catch (error) {
      throw new Error(`Error finding Celda by status: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find available cells by type
  static async findAvailableByType(tipo) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM CELDA WHERE tipo = ? AND estado = "Libre"';
      const result = await db.executeQuery(sql, [tipo]);
      
      return result.results.map(row => {
        const celda = new Celda();
        celda._mapRowToObject(row);
        return celda;
      });
    } catch (error) {
      throw new Error(`Error finding available Celda by type: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Count cells by type and status
  static async countByTypeAndStatus(tipo, estado) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT COUNT(*) as total FROM CELDA WHERE tipo = ? AND estado = ?';
      const result = await db.executeQuery(sql, [tipo, estado]);
      
      return result.results[0].total;
    } catch (error) {
      throw new Error(`Error counting Celda by type and status: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update cell
  async update() {
    try {
      const sql = `UPDATE CELDA SET tipo = ?, estado = ? WHERE id = ?`;
      
      const params = [this._tipo, this._estado, this._id];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating Celda: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // UPDATE - Change cell status
  async changeStatus(newStatus) {
    try {
      this._estado = newStatus;
      const sql = `UPDATE CELDA SET estado = ? WHERE id = ?`;
      
      await this._db.executeQuery(sql, [this._estado, this._id]);
      return this;
    } catch (error) {
      throw new Error(`Error changing Celda status: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete cell
  async delete() {
    try {
      const sql = 'DELETE FROM CELDA WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting Celda: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id = row.id;
    this._tipo = row.tipo;
    this._estado = row.estado;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      tipo: this._tipo,
      estado: this._estado
    };
  }
}

module.exports = Celda; 