/*
 * Node server configuration
 */

const http = require('http');         // import Node
const app = require('./backend/app'); // import Express

const port = process.env.PORT || 3000;

// create server
// Use Express app as listener for incoming requests
app.set('port', port);
const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//   res.end('Response without express');
// });

// port number
server.listen(port);
