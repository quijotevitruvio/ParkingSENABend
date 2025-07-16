const DatabaseConnection = require('../DatabaseConnection');

class Incidencia {
  constructor(
    id = null,
    nombre = null
  ) {
    this._id = id;
    this._nombre = nombre;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() { return this._id; }
  get nombre() { return this._nombre; }

  // Setters
  set id(value) { this._id = value; }
  set nombre(value) { this._nombre = value; }

  // CREATE - Insert new incident type
  async create() {
    try {
      const sql = `INSERT INTO INCIDENCIA (nombre) VALUES (?)`;
      
      const params = [this._nombre];
      
      const result = await this._db.executeQuery(sql, params);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating Incidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get incident by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM INCIDENCIA WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Incidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all incidents
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM INCIDENCIA';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const incidencia = new Incidencia();
        incidencia._mapRowToObject(row);
        return incidencia;
      });
    } catch (error) {
      throw new Error(`Error finding all Incidencia: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by name
  async findByNombre(nombre) {
    try {
      const sql = 'SELECT * FROM INCIDENCIA WHERE nombre LIKE ?';
      const result = await this._db.executeQuery(sql, [`%${nombre}%`]);
      
      return result.results.map(row => {
        const incidencia = new Incidencia();
        incidencia._mapRowToObject(row);
        return incidencia;
      });
    } catch (error) {
      throw new Error(`Error finding Incidencia by name: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // UPDATE - Update incident
  async update() {
    try {
      const sql = `UPDATE INCIDENCIA SET nombre = ? WHERE id = ?`;
      
      const params = [this._nombre, this._id];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating Incidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete incident
  async delete() {
    try {
      const sql = 'DELETE FROM INCIDENCIA WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting Incidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id = row.id;
    this._nombre = row.nombre;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre
    };
  }
}

module.exports = Incidencia; 