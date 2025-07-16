const mysql = require('mysql2');

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

class DatabaseConnection {
  constructor() {
    // Configuración de la conexión basada en app.js
    this.config = {
      // Usar variables de entorno con valores por defecto
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'parkinglot',
    };
    
    this.connection = null;
    this.isConnected = false;
  }

  // Método para establecer la conexión
  connect() {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection(this.config);
      
      this.connection.connect((err) => {
        if (err) {
          console.error('Error conectando a la base de datos:', err.message);
          this.isConnected = false;
          reject(err);
          return;
        }
        
        console.log('Conectado a MySQL como ID:', this.connection.threadId);
        this.isConnected = true;
        resolve(this.connection);
      });

      // Manejar errores de conexión
      this.connection.on('error', (err) => {
        console.error('Error de conexión:', err.message);
        this.isConnected = false;
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.log('Conexión perdida, necesita reconectar...');
        }
      });
    });
  }

  // Método para ejecutar consultas
  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.connection) {
        reject(new Error('No hay conexión activa a la base de datos'));
        return;
      }

      this.connection.query(sql, params, (err, results, fields) => {
        if (err) {
          console.error('Error ejecutando la consulta:', err.message);
          reject(err);
          return;
        }
        
        resolve({
          results: results,
          fields: fields,
          rowCount: results.length
        });
      });
    });
  }

  // Método para ejecutar consultas con async/await
  async executeQuery(sql, params = []) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      const result = await this.query(sql, params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Método para cerrar la conexión
  close() {
    return new Promise((resolve, reject) => {
      if (this.connection && this.isConnected) {
        this.connection.end((err) => {
          if (err) {
            console.error('Error cerrando la conexión:', err.message);
            reject(err);
            return;
          }
          
          console.log('Conexión cerrada correctamente.');
          this.isConnected = false;
          this.connection = null;
          resolve();
        });
      } else {
        console.log('No hay conexión activa para cerrar.');
        resolve();
      }
    });
  }

  // Método para verificar el estado de la conexión
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      threadId: this.connection ? this.connection.threadId : null,
      config: {
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        user: this.config.user
      }
    };
  }
}

// Exportar la clase
module.exports = DatabaseConnection; 