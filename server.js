// Node import
const http = require('http');

// create server
const server = http.createServer((req, res) => {
  res.end('This is my first response');
});

// port number
server.listen(process.env.PORT || 3000);
