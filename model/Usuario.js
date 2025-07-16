const DatabaseConnection = require('../DatabaseConnection');

class Usuario {
  constructor(
    id_usuario = null,
    tipo_documento = null,
    numero_documento = null,
    primer_nombre = null,
    segundo_nombre = null,
    primer_apellido = null,
    segundo_apellido = null,
    direccion_correo = null,
    numero_celular = null,
    foto_perfil = null,
    estado = null,
    clave = null,
    perfil_usuario_id = null
  ) {
    this._id_usuario = id_usuario;
    this._tipo_documento = tipo_documento;
    this._numero_documento = numero_documento;
    this._primer_nombre = primer_nombre;
    this._segundo_nombre = segundo_nombre;
    this._primer_apellido = primer_apellido;
    this._segundo_apellido = segundo_apellido;
    this._direccion_correo = direccion_correo;
    this._numero_celular = numero_celular;
    this._foto_perfil = foto_perfil;
    this._estado = estado;
    this._clave = clave;
    this._perfil_usuario_id = perfil_usuario_id;
    this._db = new DatabaseConnection();
  }

  // Getters
  get id_usuario() { return this._id_usuario; }
  get tipo_documento() { return this._tipo_documento; }
  get numero_documento() { return this._numero_documento; }
  get primer_nombre() { return this._primer_nombre; }
  get segundo_nombre() { return this._segundo_nombre; }
  get primer_apellido() { return this._primer_apellido; }
  get segundo_apellido() { return this._segundo_apellido; }
  get direccion_correo() { return this._direccion_correo; }
  get numero_celular() { return this._numero_celular; }
  get foto_perfil() { return this._foto_perfil; }
  get estado() { return this._estado; }
  get clave() { return this._clave; }
  get perfil_usuario_id() { return this._perfil_usuario_id; }

  // Setters
  set id_usuario(value) { this._id_usuario = value; }
  set tipo_documento(value) { this._tipo_documento = value; }
  set numero_documento(value) { this._numero_documento = value; }
  set primer_nombre(value) { this._primer_nombre = value; }
  set segundo_nombre(value) { this._segundo_nombre = value; }
  set primer_apellido(value) { this._primer_apellido = value; }
  set segundo_apellido(value) { this._segundo_apellido = value; }
  set direccion_correo(value) { this._direccion_correo = value; }
  set numero_celular(value) { this._numero_celular = value; }
  set foto_perfil(value) { this._foto_perfil = value; }
  set estado(value) { this._estado = value; }
  set clave(value) { this._clave = value; }
  set perfil_usuario_id(value) { this._perfil_usuario_id = value; }

  // CREATE - Insert new user
  async create() {
    try {
      const sql = `INSERT INTO USUARIO (tipo_documento, numero_documento, primer_nombre, segundo_nombre, 
                   primer_apellido, segundo_apellido, direccion_correo, numero_celular, foto_perfil, 
                   estado, clave, PERFIL_USUARIO_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const params = [
        this._tipo_documento, this._numero_documento, this._primer_nombre, this._segundo_nombre,
        this._primer_apellido, this._segundo_apellido, this._direccion_correo, this._numero_celular,
        this._foto_perfil, this._estado, this._clave, this._perfil_usuario_id
      ];
      
      const result = await this._db.executeQuery(sql, params);
      this._id_usuario = result.results.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating Usuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get user by ID
  async findById(id) {
    try {
      const sql = 'SELECT * FROM USUARIO WHERE id_usuario = ?';
      const result = await this._db.executeQuery(sql, [id]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Usuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Get all users
  static async findAll() {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM USUARIO';
      const result = await db.executeQuery(sql);
      
      return result.results.map(row => {
        const usuario = new Usuario();
        usuario._mapRowToObject(row);
        return usuario;
      });
    } catch (error) {
      throw new Error(`Error finding all Usuario: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by document number
  async findByDocument(numero_documento) {
    try {
      const sql = 'SELECT * FROM USUARIO WHERE numero_documento = ?';
      const result = await this._db.executeQuery(sql, [numero_documento]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        this._mapRowToObject(row);
        return this;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Usuario by document: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // READ - Find by email
  static async findByEmail(email) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM USUARIO WHERE direccion_correo = ?';
      const result = await db.executeQuery(sql, [email]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        const user = new Usuario();
        user._mapRowToObject(row);
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Usuario by email: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // READ - Find by email or document number
  static async findByLoginIdentifier(identifier) {
    const db = new DatabaseConnection();
    try {
      const sql = 'SELECT * FROM USUARIO WHERE direccion_correo = ? OR numero_documento = ?';
      const result = await db.executeQuery(sql, [identifier, identifier]);
      
      if (result.results.length > 0) {
        const row = result.results[0];
        const user = new Usuario();
        user._mapRowToObject(row);
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding Usuario by identifier: ${error.message}`);
    } finally {
      await db.close();
    }
  }

  // UPDATE - Update user
  async update() {
    try {
      const sql = `UPDATE USUARIO SET tipo_documento = ?, numero_documento = ?, primer_nombre = ?, 
                   segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, direccion_correo = ?, 
                   numero_celular = ?, foto_perfil = ?, estado = ?, clave = ?, PERFIL_USUARIO_id = ? 
                   WHERE id_usuario = ?`;
      
      const params = [
        this._tipo_documento, this._numero_documento, this._primer_nombre, this._segundo_nombre,
        this._primer_apellido, this._segundo_apellido, this._direccion_correo, this._numero_celular,
        this._foto_perfil, this._estado, this._clave, this._perfil_usuario_id, this._id_usuario
      ];
      
      await this._db.executeQuery(sql, params);
      return this;
    } catch (error) {
      throw new Error(`Error updating Usuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // DELETE - Delete user
  async delete() {
    try {
      const sql = 'DELETE FROM USUARIO WHERE id_usuario = ?';
      await this._db.executeQuery(sql, [this._id_usuario]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting Usuario: ${error.message}`);
    } finally {
      await this._db.close();
    }
  }

  // Helper method to map database row to object properties
  _mapRowToObject(row) {
    this._id_usuario = row.id_usuario;
    this._tipo_documento = row.tipo_documento;
    this._numero_documento = row.numero_documento;
    this._primer_nombre = row.primer_nombre;
    this._segundo_nombre = row.segundo_nombre;
    this._primer_apellido = row.primer_apellido;
    this._segundo_apellido = row.segundo_apellido;
    this._direccion_correo = row.direccion_correo;
    this._numero_celular = row.numero_celular;
    this._foto_perfil = row.foto_perfil;
    this._estado = row.estado;
    this._clave = row.clave;
    this._perfil_usuario_id = row.PERFIL_USUARIO_id;
  }

  // Convert to JSON
  toJSON() {
    return {
      id_usuario: this._id_usuario,
      tipo_documento: this._tipo_documento,
      numero_documento: this._numero_documento,
      primer_nombre: this._primer_nombre,
      segundo_nombre: this._segundo_nombre,
      primer_apellido: this._primer_apellido,
      segundo_apellido: this._segundo_apellido,
      direccion_correo: this._direccion_correo,
      numero_celular: this._numero_celular,
      foto_perfil: this._foto_perfil,
      estado: this._estado,
      clave: this._clave,
      perfil_usuario_id: this._perfil_usuario_id
    };
  }
}

module.exports = Usuario; 