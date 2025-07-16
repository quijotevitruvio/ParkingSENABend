const DatabaseConnection = require('../DatabaseConnection');

class PicoPlaca {
  constructor(
    id = null,
    tipo_vehiculo = null,
    numero = null,
    dia = null
  ) {
    this._id = id;
    this._tipo_vehiculo = tipo_vehiculo;
    this._numero = numero;
    this._dia = dia;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() { return this._id; }
  get tipo_vehiculo() { return this._tipo_vehiculo; }
  get numero() { return this._numero; }
  get dia() { return this._dia; }

  // Setters
  set id(value) { this._id = value; }
  set tipo_vehiculo(value) { this._tipo_vehiculo = value; }
  set numero(value) { this._numero = value; }
  set dia(value) { this._dia = value; }

  // CREATE - Insert new pico placa rule
  async create() {
    try {
      const sql = `INSERT INTO PICO_PLACA (tipo_vehiculo, numero, dia) VALUES (?, ?, ?)`;
      
      const params = [this._tipo_vehiculo, this._numero, this._dia];
      
      const result = await this._db.executeQuery(sql, params);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating PicoPlaca: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get pico placa by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM PICO_PLACA WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding PicoPlaca: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all pico placa rules
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM PICO_PLACA';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const picoPlaca = new PicoPlaca();
        picoPlaca._mapRowToObject(row);
        return picoPlaca;
      });
    } catch (error) {
      throw new Error(`Error finding all PicoPlaca: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by vehicle type and day
  static async findByVehicleTypeAndDay(tipoVehiculo, dia) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM PICO_PLACA WHERE tipo_vehiculo = ? AND dia = ?';
      const result = await db.executeQuery(sql, [tipoVehiculo, dia]);
      
      return result.results.map(row => {
        const picoPlaca = new PicoPlaca();
        picoPlaca._mapRowToObject(row);
        return picoPlaca;
      });
    } catch (error) {
      throw new Error(`Error finding PicoPlaca by type and day: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by number and day
  static async findByNumberAndDay(numero, dia) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM PICO_PLACA WHERE numero = ? AND dia = ?';
      const result = await db.executeQuery(sql, [numero, dia]);
      
      return result.results.map(row => {
        const picoPlaca = new PicoPlaca();
        picoPlaca._mapRowToObject(row);
        return picoPlaca;
      });
    } catch (error) {
      throw new Error(`Error finding PicoPlaca by number and day: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update pico placa rule
  async update() {
    try {
      const sql = `UPDATE PICO_PLACA SET tipo_vehiculo = ?, numero = ?, dia = ? WHERE id = ?`;
      
      const params = [this._tipo_vehiculo, this._numero, this._dia, this._id];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating PicoPlaca: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete pico placa rule
  async delete() {
    try {
      const sql = 'DELETE FROM PICO_PLACA WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting PicoPlaca: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id = row.id;
    this._tipo_vehiculo = row.tipo_vehiculo;
    this._numero = row.numero;
    this._dia = row.dia;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      tipo_vehiculo: this._tipo_vehiculo,
      numero: this._numero,
      dia: this._dia
    };
  }
}

module.exports = PicoPlaca; 