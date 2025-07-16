const DatabaseConnection = require('../DatabaseConnection');

class Vehiculo {
  constructor(
    id = null,
    placa = null,
    color = null,
    modelo = null,
    marca = null,
    tipo = null,
    usuario_id_usuario = null
  ) {
    this._id = id;
    this._placa = placa;
    this._color = color;
    this._modelo = modelo;
    this._marca = marca;
    this._tipo = tipo;
    this._usuario_id_usuario = usuario_id_usuario;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() { return this._id; }
  get placa() { return this._placa; }
  get color() { return this._color; }
  get modelo() { return this._modelo; }
  get marca() { return this._marca; }
  get tipo() { return this._tipo; }
  get usuario_id_usuario() { return this._usuario_id_usuario; }

  // Setters
  set id(value) { this._id = value; }
  set placa(value) { this._placa = value; }
  set color(value) { this._color = value; }
  set modelo(value) { this._modelo = value; }
  set marca(value) { this._marca = value; }
  set tipo(value) { this._tipo = value; }
  set usuario_id_usuario(value) { this._usuario_id_usuario = value; }

  // CREATE - Insert new vehicle
  async create() {
    try {
      const sql = `INSERT INTO VEHICULO (placa, color, modelo, marca, tipo, USUARIO_id_usuario) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
      
      const params = [
        this._placa, this._color, this._modelo, this._marca, this._tipo, this._usuario_id_usuario
      ];
      
      const result = await this._db.executeQuery(sql, params);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating Vehiculo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get vehicle by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM VEHICULO WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Vehiculo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all vehicles
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM VEHICULO';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const vehiculo = new Vehiculo();
        vehiculo._mapRowToObject(row);
        return vehiculo;
      });
    } catch (error) {
      throw new Error(`Error finding all Vehiculo: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by plate
  async findByPlaca(placa) {
    try {
      const sql = 'SELECT * FROM VEHICULO WHERE placa = ?';
      const result = await this._db.executeQuery(sql, [placa]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Vehiculo by placa: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Find vehicles by user ID
  static async findByUserId(userId) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM VEHICULO WHERE USUARIO_id_usuario = ?';
      const result = await db.executeQuery(sql, [userId]);
      
      return result.results.map(row => {
        const vehiculo = new Vehiculo();
        vehiculo._mapRowToObject(row);
        return vehiculo;
      });
    } catch (error) {
      throw new Error(`Error finding Vehiculo by user ID: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update vehicle
  async update() {
    try {
      const sql = `UPDATE VEHICULO SET placa = ?, color = ?, modelo = ?, marca = ?, tipo = ?, 
                   USUARIO_id_usuario = ? WHERE id = ?`;
      
      const params = [
        this._placa, this._color, this._modelo, this._marca, this._tipo, 
        this._usuario_id_usuario, this._id
      ];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating Vehiculo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete vehicle
  async delete() {
    try {
      const sql = 'DELETE FROM VEHICULO WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting Vehiculo: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id = row.id;
    this._placa = row.placa;
    this._color = row.color;
    this._modelo = row.modelo;
    this._marca = row.marca;
    this._tipo = row.tipo;
    this._usuario_id_usuario = row.USUARIO_id_usuario;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      placa: this._placa,
      color: this._color,
      modelo: this._modelo,
      marca: this._marca,
      tipo: this._tipo,
      usuario_id_usuario: this._usuario_id_usuario
    };
  }
}

module.exports = Vehiculo; 