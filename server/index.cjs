const app = require('./app.cjs');

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HOURLY API server running on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
