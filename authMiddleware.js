const jwt = require('jsonwebtoken');
const APP_SECRET = 'Secret';
const USERNAME = 'admin';
const PASSWORD = '123456';
const mappings = {
  get: ['/api/orders', '/orders'],
  post: ['/api/movie-list', '/movie-list'],
};

function requiresAuth(method, url) {
  return (mappings[method.toLowerCase()] || []).find((p) => url.startsWith(p)) !== undefined;
}

module.exports = function (req, res, next) {
  if (req.url.endsWith('/login') && req.method === 'POST') {
    if (req.body && req.body.name === USERNAME && req.body.password === PASSWORD) {
      const token = jwt.sign({ data: USERNAME, expiresIn: '1h' }, APP_SECRET);
      res.json({ success: true, token: token });
      return;
    } else {
      res.json({ success: false });
      return;
    }
  } else if (requiresAuth(req.method, req.url)) {
    let token = req.headers['authorization'] || '';
    if (token.startsWith('Bearer<')) {
      token = token.substring(7, token.length-1);
      try {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      } catch (error) {
        // Handle the verification error if needed
      }
    }
    res.statusCode = 401;
    res.end();
    return;
  }
  next();
};
