const express = require('express');
const DatabaseConnection = require('./DatabaseConnection');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const checkDbConnection = require('./checkDbConnection'); // Script para verificar la conexión a la BD

const { Usuario, Vehiculo, AccesoSalida } = require('./model'); // Import models

const app = express();
const port = 3001; // Puerto para el backend

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Inicializar la conexión a la base de datos
const db = new DatabaseConnection();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend del Parqueadero funcionando!');
});

// Endpoint para registrar accesos (entradas/salidas)
app.post('/api/access_logs', async (req, res) => {
  const { movimiento, fecha_hora, placa, tiempo_estadia } = req.body;

  if (!movimiento || !fecha_hora || !placa) {
    return res.status(400).json({ message: 'Faltan campos obligatorios: movimiento, fecha_hora, placa' });
  }

  try {
    // Primero, buscar el VEHICULO_id basado en la placa
    let vehicleIdResult = await db.executeQuery('SELECT id FROM VEHICULO WHERE placa = ?', [placa]);
    let vehiculo_id;

    if (vehicleIdResult.results.length > 0) {
      vehiculo_id = vehicleIdResult.results[0].id;
    } else {
      // Si el vehículo no existe, insertarlo (asumiendo un USUARIO_id_usuario por defecto o un sistema de registro de vehículos)
      // Por simplicidad, usaremos un USUARIO_id_usuario fijo por ahora. En un sistema real, esto vendría del login o registro.
      const defaultUserId = 1; // Puedes ajustar esto o hacer que venga de la autenticación
      const insertVehicleResult = await db.executeQuery('INSERT INTO VEHICULO (placa, USUARIO_id_usuario) VALUES (?, ?)', [placa, defaultUserId]);
      vehiculo_id = insertVehicleResult.results.insertId;
    }

    const sql = 'INSERT INTO ACCESO_SALIDAS (movimiento, fecha_hora, tiempo_estadia, VEHICULO_id) VALUES (?, ?, ?, ?)';
    const params = [movimiento, fecha_hora, tiempo_estadia, vehiculo_id];
    
    const result = await db.executeQuery(sql, params);
    res.status(201).json({ message: 'Registro de acceso guardado exitosamente', id: result.results.insertId });
  } catch (error) {
    console.error('Error al guardar registro de acceso:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para registro de usuarios
app.post('/api/register', async (req, res) => {
  const { email, password, tipo_documento, numero_documento, primer_nombre, primer_apellido, numero_celular } = req.body;

  if (!email || !password || !tipo_documento || !numero_documento || !primer_nombre || !primer_apellido || !numero_celular) {
    return res.status(400).json({ message: 'Faltan campos obligatorios: email, password, tipo_documento, numero_documento, primer_nombre, primer_apellido, numero_celular' });
  }

  try {
    // Check if user already exists
    const existingUser = await Usuario.findByEmail(email); // Assuming findByEmail exists or create one
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario con este correo ya existe.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create new user (assuming default values for other fields for now)
    const newUser = new Usuario(
      null, // id_usuario (auto-increment)
      tipo_documento, 
      numero_documento,
      primer_nombre,
      null, // segundo_nombre (now optional)
      primer_apellido,
      null, // segundo_apellido (now optional)
      email, // direccion_correo
      numero_celular,
      null, // foto_perfil (now optional)
      'activo', // estado (default)
      hashedPassword, // clave
      3 // perfil_usuario_id (default to 'usuario' profile)
    );
    await newUser.create();

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id_usuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para login de usuarios
app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios: identificador y password' });
  }

  try {
    const user = await Usuario.findByLoginIdentifier(identifier); // Use new method
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.clave);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // For simplicity, return user ID. In a real app, you'd return a JWT.
    res.status(200).json({ message: 'Login exitoso', userId: user.id_usuario, userName: user.primer_nombre });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para obtener detalles de un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = new Usuario();
    const foundUser = await user.findById(userId);
    if (foundUser) {
      res.status(200).json(foundUser.toJSON());
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para actualizar datos de un usuario
app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = new Usuario(userId, userData.tipo_documento, userData.numero_documento, userData.primer_nombre, userData.segundo_nombre, userData.primer_apellido, userData.segundo_apellido, userData.direccion_correo, userData.numero_celular, userData.foto_perfil, userData.estado, userData.clave, userData.perfil_usuario_id);
    await user.update();
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para obtener todos los registros de acceso de un usuario (historial de vehículos)
app.get('/api/users/:userId/access_logs', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Asumiendo que VEHICULO tiene una columna USUARIO_id_usuario
    const sql = `
      SELECT
        ASL.*,
        V.placa,
        V.USUARIO_id_usuario
      FROM ACCESO_SALIDAS AS ASL
      JOIN VEHICULO AS V ON ASL.VEHICULO_id = V.id
      WHERE V.USUARIO_id_usuario = ?
      ORDER BY ASL.fecha_hora DESC
    `;
    const result = await db.executeQuery(sql, [userId]);
    res.status(200).json(result.results);
  } catch (error) {
    console.error('Error al obtener historial de acceso:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Endpoint para actualizar las notas (incidencias) de un registro de acceso
app.put('/api/access_logs/:id/notes', async (req, res) => {
  try {
    const accessLogId = req.params.id;
    const { notes } = req.body;
    const sql = 'UPDATE ACCESO_SALIDAS SET notas = ? WHERE id = ?';
    await db.executeQuery(sql, [notes, accessLogId]);
    res.status(200).json({ message: 'Notas actualizadas exitosamente' });
  } catch (error) {
    console.error('Error al actualizar notas:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Iniciar el servidor
const startServer = async () => {
  // 1. Probar la conexión a la base de datos. El script se encargará de
  // mostrar el estado y terminar el proceso si la conexión falla.
  await checkDbConnection();

  // 2. Si la conexión es exitosa, iniciar el servidor Express
  app.listen(port, () => {
    console.log(`\n🚀 Servidor backend escuchando en http://localhost:${port}`);
  });
};

startServer();
