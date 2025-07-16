const DatabaseConnection = require('../DatabaseConnection');

class AccesoSalida {
  constructor(
    id = null,
    movimiento = null,
    fecha_hora = null,
    puerta = null,
    tiempo_estadia = null,
    vehiculo_id = null
  ) {
    this._id = id;
    this._movimiento = movimiento;
    this._fecha_hora = fecha_hora;
    this._puerta = puerta;
    this._tiempo_estadia = tiempo_estadia;
    this._vehiculo_id = vehiculo_id;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() { return this._id; }
  get movimiento() { return this._movimiento; }
  get fecha_hora() { return this._fecha_hora; }
  get puerta() { return this._puerta; }
  get tiempo_estadia() { return this._tiempo_estadia; }
  get vehiculo_id() { return this._vehiculo_id; }

  // Setters
  set id(value) { this._id = value; }
  set movimiento(value) { this._movimiento = value; }
  set fecha_hora(value) { this._fecha_hora = value; }
  set puerta(value) { this._puerta = value; }
  set tiempo_estadia(value) { this._tiempo_estadia = value; }
  set vehiculo_id(value) { this._vehiculo_id = value; }

  // CREATE - Insert new access/exit record
  async create() {
    try {
      const sql = `INSERT INTO ACCESO_SALIDAS (movimiento, fecha_hora, puerta, tiempo_estadia, VEHICULO_id) 
                   VALUES (?, ?, ?, ?, ?)`;
      
      const params = [
        this._movimiento, this._fecha_hora, this._puerta, this._tiempo_estadia, this._vehiculo_id
      ];
      
      const result = await this._db.executeQuery(sql, params);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating AccesoSalida: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get access/exit by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM ACCESO_SALIDAS WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding AccesoSalida: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all access/exit records
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM ACCESO_SALIDAS';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const accesoSalida = new AccesoSalida();
        accesoSalida._mapRowToObject(row);
        return accesoSalida;
      });
    } catch (error) {
      throw new Error(`Error finding all AccesoSalida: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by vehicle ID
  static async findByVehicleId(vehiculoId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM ACCESO_SALIDAS WHERE VEHICULO_id = ?';
      const result = await db.executeQuery(sql, [vehiculoId]);
      
      return result.results.map(row => {
        const accesoSalida = new AccesoSalida();
        accesoSalida._mapRowToObject(row);
        return accesoSalida;
      });
    } catch (error) {
      throw new Error(`Error finding AccesoSalida by vehicle ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by movement type (Entrada/Salida)
  static async findByMovimiento(movimiento) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM ACCESO_SALIDAS WHERE movimiento = ?';
      const result = await db.executeQuery(sql, [movimiento]);
      
      return result.results.map(row => {
        const accesoSalida = new AccesoSalida();
        accesoSalida._mapRowToObject(row);
        return accesoSalida;
      });
    } catch (error) {
      throw new Error(`Error finding AccesoSalida by movement: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by date range
  static async findByDateRange(fechaInicio, fechaFin) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM ACCESO_SALIDAS WHERE fecha_hora BETWEEN ? AND ?';
      const result = await db.executeQuery(sql, [fechaInicio, fechaFin]);
      
      return result.results.map(row => {
        const accesoSalida = new AccesoSalida();
        accesoSalida._mapRowToObject(row);
        return accesoSalida;
      });
    } catch (error) {
      throw new Error(`Error finding AccesoSalida by date range: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update access/exit record
  async update() {
    try {
      const sql = `UPDATE ACCESO_SALIDAS SET movimiento = ?, fecha_hora = ?, puerta = ?, 
                   tiempo_estadia = ?, VEHICULO_id = ? WHERE id = ?`;
      
      const params = [
        this._movimiento, this._fecha_hora, this._puerta, this._tiempo_estadia, 
        this._vehiculo_id, this._id
      ];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating AccesoSalida: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete access/exit record
  async delete() {
    try {
      const sql = 'DELETE FROM ACCESO_SALIDAS WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting AccesoSalida: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id = row.id;
    this._movimiento = row.movimiento;
    this._fecha_hora = row.fecha_hora;
    this._puerta = row.puerta;
    this._tiempo_estadia = row.tiempo_estadia;
    this._vehiculo_id = row.VEHICULO_id;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      movimiento: this._movimiento,
      fecha_hora: this._fecha_hora,
      puerta: this._puerta,
      tiempo_estadia: this._tiempo_estadia,
      vehiculo_id: this._vehiculo_id
    };
  }
}

module.exports = AccesoSalida; 