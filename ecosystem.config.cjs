const path = require('node:path');
module.exports = {
  apps: [{
    name: 'grocerypro-mysql',
    cwd: path.join(__dirname, 'backend'),
    script: path.join(__dirname, 'backend/scripts/run-mysql.cjs'),
    interpreter: process.execPath,
    autorestart: true,
    restart_delay: 3000,
    shutdown_with_message: true,
    kill_timeout: 15000,
    time: true,
  }, {
    name: 'grocerypro-backend',
    cwd: path.join(__dirname, 'backend'),
    script: path.join(__dirname, 'backend/scripts/run-pm2.cjs'),
    interpreter: process.execPath,
    env: {
      PORT: process.env.PORT || '3033',
      // HOST defaults to TAILSCALE_IP from backend/.env plus loopback.
      ...(process.env.HOST ? { HOST: process.env.HOST } : {}),
      WEB_DEV: 'true',
    },
    autorestart: true,
    restart_delay: 3000,
    time: true,
  }],
};
