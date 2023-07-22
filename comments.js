// create web server
// run: node comments.js
// to test: curl -X POST -H "Content-Type: application/json" -d '{"text":"hello"}' http://localhost:3000/comments
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const comments = [];
comments.push({text: "hello", id: 0});
comments.push({text: "world", id: 1});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const id = parseInt(query.id, 10);
    if (isNaN(id)) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }
    const comment = comments.find(comment => comment.id === id);
    if (comment === undefined) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(comment));
  } else if (req.method === 'POST') {
    bodyParser.json()(req, res, () => {
      const comment = req.body;
      if (comment.text === undefined) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
      }
      comment.id = comments.length;
      comments.push(comment);
      res.end('OK');
    });
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/'); 
