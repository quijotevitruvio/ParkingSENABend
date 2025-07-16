const DatabaseConnection = require('../DatabaseConnection');

class HistorialParqueo {
  constructor(
    celda_id = null,
    vehiculo_id = null,
    fecha_hora = null
  ) {
    this._celda_id = celda_id;
    this._vehiculo_id = vehiculo_id;
    this._fecha_hora = fecha_hora;
    this._db = new DatabaseConnection();
  }

  // Getters
  get celda_id() { return this._celda_id; }
  get vehiculo_id() { return this._vehiculo_id; }
  get fecha_hora() { return this._fecha_hora; }

  // Setters
  set celda_id(value) { this._celda_id = value; }
  set vehiculo_id(value) { this._vehiculo_id = value; }
  set fecha_hora(value) { this._fecha_hora = value; }

  // CREATE - Insert new parking history record
  async create() {
    try {
      const sql = `INSERT INTO HISTORIAL_PARQUEO (CELDA_id, VEHICULO_id, fecha_hora) 
                   VALUES (?, ?, ?)`;
      
      const params = [this._celda_id, this._vehiculo_id, this._fecha_hora];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error creating HistorialParqueo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get parking history by cell and vehicle IDs
  async findByIds(celdaId, vehiculoId) {
    try {
      const sql = 'SELECT * FROM HISTORIAL_PARQUEO WHERE CELDA_id = ? AND VEHICULO_id = ?';
      const result = await this._db.executeQuery(sql, [celdaId, vehiculoId]);
      
      return result.results.map(row => {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(row);
        return historial;
      });
    } catch (error) {
      throw new Error(`Error finding HistorialParqueo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all parking history
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM HISTORIAL_PARQUEO';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(row);
        return historial;
      });
    } catch (error) {
      throw new Error(`Error finding all HistorialParqueo: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find history by vehicle ID
  static async findByVehicleId(vehiculoId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM HISTORIAL_PARQUEO WHERE VEHICULO_id = ?';
      const result = await db.executeQuery(sql, [vehiculoId]);
      
      return result.results.map(row => {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(row);
        return historial;
      });
    } catch (error) {
      throw new Error(`Error finding HistorialParqueo by vehicle ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find history by cell ID
  static async findByCellId(celdaId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM HISTORIAL_PARQUEO WHERE CELDA_id = ?';
      const result = await db.executeQuery(sql, [celdaId]);
      
      return result.results.map(row => {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(row);
        return historial;
      });
    } catch (error) {
      throw new Error(`Error finding HistorialParqueo by cell ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find history by date range
  static async findByDateRange(fechaInicio, fechaFin) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM HISTORIAL_PARQUEO WHERE fecha_hora BETWEEN ? AND ?';
      const result = await db.executeQuery(sql, [fechaInicio, fechaFin]);
      
      return result.results.map(row => {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(row);
        return historial;
      });
    } catch (error) {
      throw new Error(`Error finding HistorialParqueo by date range: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Get current vehicle in cell
  static async getCurrentVehicleInCell(celdaId) {
    const db = new DatabaseConnection();
    try {
      const sql = `SELECT * FROM HISTORIAL_PARQUEO 
                   WHERE CELDA_id = ? 
                   ORDER BY fecha_hora DESC 
                   LIMIT 1`;
      const result = await db.executeQuery(sql, [celdaId]);
      
      if (result.results.length > 0) {
        const historial = new HistorialParqueo();
        historial._mapRowToObject(result.results[0]);
        return historial;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding current vehicle in cell: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Get parking statistics
  static async getParkingStatistics() {
    const db = new DatabaseConnection();
    try {
      const sql = `SELECT 
                     COUNT(*) as total_registros,
                     COUNT(DISTINCT CELDA_id) as celdas_utilizadas,
                     COUNT(DISTINCT VEHICULO_id) as vehiculos_diferentes
                   FROM HISTORIAL_PARQUEO`;
      const result = await db.executeQuery(sql);
      
      return result.results[0];
    } catch (error) {
      throw new Error(`Error getting parking statistics: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update parking history
  async update() {
    try {
      const sql = `UPDATE HISTORIAL_PARQUEO SET fecha_hora = ? 
                   WHERE CELDA_id = ? AND VEHICULO_id = ?`;
      
      const params = [this._fecha_hora, this._celda_id, this._vehiculo_id];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating HistorialParqueo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete parking history record
  async delete() {
    try {
      const sql = 'DELETE FROM HISTORIAL_PARQUEO WHERE CELDA_id = ? AND VEHICULO_id = ?';
      await this._db.executeQuery(sql, [this._celda_id, this._vehiculo_id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting HistorialParqueo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete all history for a vehicle
  static async deleteByVehicleId(vehiculoId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'DELETE FROM HISTORIAL_PARQUEO WHERE VEHICULO_id = ?';
      await db.executeQuery(sql, [vehiculoId]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting HistorialParqueo by vehicle ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // DELETE - Delete all history for a cell
  static async deleteByCellId(celdaId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'DELETE FROM HISTORIAL_PARQUEO WHERE CELDA_id = ?';
      await db.executeQuery(sql, [celdaId]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting HistorialParqueo by cell ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._celda_id = row.CELDA_id;
    this._vehiculo_id = row.VEHICULO_id;
    this._fecha_hora = row.fecha_hora;
  }

  // Convert to JSON
  toJSON() {
    return {
      celda_id: this._celda_id,
      vehiculo_id: this._vehiculo_id,
      fecha_hora: this._fecha_hora
    };
  }
}

module.exports = HistorialParqueo; 