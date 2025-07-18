require('dotenv').config();

const config = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  
  // Database configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 8889,
  DB_USER: process.env.DB_USER || 'empanada',
  DB_PASSWORD: process.env.DB_PASSWORD || 'empanada1',
  DB_NAME: process.env.DB_NAME || 'ParkingLot',
  
  // Security configuration
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  
  // CORS configuration
  CORS_ORIGINS: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'],
  
  // Rate limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100, // 100 requests per window
};

// Validate required environment variables in production
if (config.NODE_ENV === 'production') {
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      console.error(`❌ Missing required environment variable: ${varName}`);
      process.exit(1);
    }
  }
}

module.exports = config; 