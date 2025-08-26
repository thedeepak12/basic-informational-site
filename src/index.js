const http = require('http');
const fs = require('fs');
const path = require('path');

function serveFile(filePath, contentType, res) {
  const fullPath = path.join(__dirname, filePath);
  
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server error: ${err.message}`);
    } else {
      const statusCode = filePath.includes('404.html') ? 404 : 200;
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  let filePath = '';
  
  if (req.url.startsWith('/css/')) {
    filePath = `../public${req.url}`;
    serveFile(filePath, 'text/css', res);
    return;
  }

  switch (req.url) {
    case '/':
      filePath = '../public/index.html';
      break;
    case '/about':
      filePath = '../public/about.html';
      break;
    case '/contact-me':
      filePath = '../public/contact-me.html';
      break;
    default:
      filePath = '../public/404.html';
      break;
  }

  serveFile(filePath, 'text/html', res);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${server.address().port}`);
});
