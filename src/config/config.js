require('dotenv').config();

// Usage:
// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config.js')[env];

module.exports = {
    "development": {
      "database": {
        // "dialect": "mysql", // REPLACE all these with process.env.STH
        // "host": "localhost",
        // "username": "root",
        // "password": "your-mysql-password",  // here
        // "database": "your-database-name",  // here
        // "port": 3306
        "url":process.env.DB_URL
      },
      "app": {
        "port": 3000
      },
      "jwtSecret": process.env.JWT_SECRET
    },
    "production": {
      "database": {
        "use_env_variable": process.env.DB_URL,
        "dialect": process.env.DB_DIALECT
      },
      "app": {
        "port": process.env.PORT || 3000
      },
      // "jwtSecret": "your-production-secret-key-for-jwt"
      "jwtSecret": process.env.JWT_SECRET
    }
  }
  