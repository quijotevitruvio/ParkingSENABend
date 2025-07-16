const DatabaseConnection = require('../DatabaseConnection');

class ReporteIncidencia {
  constructor(
    vehiculo_id = null,
    incidencia_id = null,
    fecha_hora = null
  ) {
    this._vehiculo_id = vehiculo_id;
    this._incidencia_id = incidencia_id;
    this._fecha_hora = fecha_hora;
    this._db = new DatabaseConnection();
  }

  // Getters
  get vehiculo_id() { return this._vehiculo_id; }
  get incidencia_id() { return this._incidencia_id; }
  get fecha_hora() { return this._fecha_hora; }

  // Setters
  set vehiculo_id(value) { this._vehiculo_id = value; }
  set incidencia_id(value) { this._incidencia_id = value; }
  set fecha_hora(value) { this._fecha_hora = value; }

  // CREATE - Insert new incident report
  async create() {
    try {
      const sql = `INSERT INTO REPORTE_INCIDENCIA (VEHICULO_id, INCIDENCIA_id, fecha_hora) 
                   VALUES (?, ?, ?)`;
      
      const params = [this._vehiculo_id, this._incidencia_id, this._fecha_hora];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error creating ReporteIncidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get incident report by vehicle and incident IDs
  async findByIds(vehiculoId, incidenciaId) {
    try {
      const sql = 'SELECT * FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ? AND INCIDENCIA_id = ?';
      const result = await this._db.executeQuery(sql, [vehiculoId, incidenciaId]);
      
      return result.results.map(row => {
        const reporte = new ReporteIncidencia();
        reporte._mapRowToObject(row);
        return reporte;
      });
    } catch (error) {
      throw new Error(`Error finding ReporteIncidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all incident reports
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM REPORTE_INCIDENCIA';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const reporte = new ReporteIncidencia();
        reporte._mapRowToObject(row);
        return reporte;
      });
    } catch (error) {
      throw new Error(`Error finding all ReporteIncidencia: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find reports by vehicle ID
  static async findByVehicleId(vehiculoId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ?';
      const result = await db.executeQuery(sql, [vehiculoId]);
      
      return result.results.map(row => {
        const reporte = new ReporteIncidencia();
        reporte._mapRowToObject(row);
        return reporte;
      });
    } catch (error) {
      throw new Error(`Error finding ReporteIncidencia by vehicle ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find reports by incident ID
  static async findByIncidentId(incidenciaId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM REPORTE_INCIDENCIA WHERE INCIDENCIA_id = ?';
      const result = await db.executeQuery(sql, [incidenciaId]);
      
      return result.results.map(row => {
        const reporte = new ReporteIncidencia();
        reporte._mapRowToObject(row);
        return reporte;
      });
    } catch (error) {
      throw new Error(`Error finding ReporteIncidencia by incident ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find reports by date range
  static async findByDateRange(fechaInicio, fechaFin) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM REPORTE_INCIDENCIA WHERE fecha_hora BETWEEN ? AND ?';
      const result = await db.executeQuery(sql, [fechaInicio, fechaFin]);
      
      return result.results.map(row => {
        const reporte = new ReporteIncidencia();
        reporte._mapRowToObject(row);
        return reporte;
      });
    } catch (error) {
      throw new Error(`Error finding ReporteIncidencia by date range: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update incident report
  async update() {
    try {
      const sql = `UPDATE REPORTE_INCIDENCIA SET fecha_hora = ? 
                   WHERE VEHICULO_id = ? AND INCIDENCIA_id = ?`;
      
      const params = [this._fecha_hora, this._vehiculo_id, this._incidencia_id];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating ReporteIncidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete incident report
  async delete() {
    try {
      const sql = 'DELETE FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ? AND INCIDENCIA_id = ?';
      await this._db.executeQuery(sql, [this._vehiculo_id, this._incidencia_id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting ReporteIncidencia: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete all reports for a vehicle
  static async deleteByVehicleId(vehiculoId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'DELETE FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ?';
      await db.executeQuery(sql, [vehiculoId]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting ReporteIncidencia by vehicle ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._vehiculo_id = row.VEHICULO_id;
    this._incidencia_id = row.INCIDENCIA_id;
    this._fecha_hora = row.fecha_hora;
  }

  // Convert to JSON
  toJSON() {
    return {
      vehiculo_id: this._vehiculo_id,
      incidencia_id: this._incidencia_id,
      fecha_hora: this._fecha_hora
    };
  }
}

module.exports = ReporteIncidencia; 