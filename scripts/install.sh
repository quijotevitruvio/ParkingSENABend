#!/bin/bash

# Script de instalación para Parking Management API
echo "🚀 Instalando Parking Management System API..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instale Node.js >= 18.0.0"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2)
MIN_VERSION="18.0.0"

if [ "$(printf '%s\n' "$MIN_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$MIN_VERSION" ]; then
    echo "❌ Se requiere Node.js >= $MIN_VERSION. Versión actual: $NODE_VERSION"
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Instalar dependencias de desarrollo
echo "🔧 Instalando dependencias de desarrollo..."
npm install --save-dev nodemon

# Instalar dependencias faltantes si no están
echo "🔧 Verificando dependencias adicionales..."
npm install express-rate-limit helmet morgan --save

# Copiar archivo de entorno si no existe
if [ ! -f .env ]; then
    echo "📋 Creando archivo .env..."
    cp env.example .env
    echo "⚠️  Recuerda configurar las variables de entorno en .env"
else
    echo "✅ Archivo .env ya existe"
fi

# Hacer el script ejecutable
chmod +x scripts/setup-db.sh

echo ""
echo "🎉 Instalación completada!"
echo ""
echo "Próximos pasos:"
echo "1. Configura las variables de entorno en .env"
echo "2. Ejecuta './scripts/setup-db.sh' para configurar la base de datos"
echo "3. Ejecuta 'npm run dev' para iniciar en modo desarrollo"
echo "4. Visita http://localhost:3001 para ver la API funcionando"
echo "" 