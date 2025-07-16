const DatabaseConnection = require('../DatabaseConnection');

class PerfilUsuario {
  constructor(id = null, perfil = null) {
    this._id = id;
    this._perfil = perfil;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id() {
    return this._id;
  }

  get perfil() {
    return this._perfil;
  }

  // Setters
  set id(value) {
    this._id = value;
  }

  set perfil(value) {
    this._perfil = value;
  }

  // CREATE - Insert new profile
  async create() {
    try {
      const sql = 'INSERT INTO PERFIL_USUARIO (perfil) VALUES (?)';
      const result = await this._db.executeQuery(sql, [this._perfil]);
      this._id = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating PerfilUsuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get profile by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM PERFIL_USUARIO WHERE id = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._id = row.id;
        this._perfil = row.perfil;
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding PerfilUsuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all profiles
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM PERFIL_USUARIO';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const perfil = new PerfilUsuario();
        perfil._id = row.id;
        perfil._perfil = row.perfil;
        return perfil;
      });
    } catch (error) {
      throw new Error(`Error finding all PerfilUsuario: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update profile
  async update() {
    try {
      const sql = 'UPDATE PERFIL_USUARIO SET perfil = ? WHERE id = ?';
      await this._db.executeQuery(sql, [this._perfil, this._id]);
      return this;
    } catch (error) {
      throw new Error(`Error updating PerfilUsuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete profile
  async delete() {
    try {
      const sql = 'DELETE FROM PERFIL_USUARIO WHERE id = ?';
      await this._db.executeQuery(sql, [this._id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting PerfilUsuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this._id,
      perfil: this._perfil
    };
  }
}

module.exports = PerfilUsuario; 