const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario.routes');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del sistema de parqueadero');
});

// Rutas de usuario
app.use('/api/usuarios', usuarioRoutes);

// Endpoint de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
