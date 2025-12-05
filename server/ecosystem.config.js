// PM2 Ecosystem Configuration for StockPilot Backend
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'stockpilot',
      script: 'npx',
      args: 'ts-node src/index.ts',
      cwd: '/home/ec2-user/StockPilot/server',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/home/ec2-user/.pm2/logs/stockpilot-error.log',
      out_file: '/home/ec2-user/.pm2/logs/stockpilot-out.log',
      log_file: '/home/ec2-user/.pm2/logs/stockpilot-combined.log',
      time: true
    }
  ]
};
