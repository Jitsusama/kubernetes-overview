const express = require('express');

const app = express();
app.use(express.static('dist'));
app.get('/healthy', (request, response) => response.status(204).end());

const listeningPort = process.env['LISTENING_PORT'] || 8080;
app.listen(listeningPort, () =>
    console.info(`server listening on port http://0.0.0.0:${listeningPort}`));
