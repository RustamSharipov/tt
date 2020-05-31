const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(createProxyMiddleware('/api', {
    changeOrigin: true,
    target: process.env.REACT_APP_API_URL,
  }));
};
