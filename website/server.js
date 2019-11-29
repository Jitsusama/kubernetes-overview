const express = require('express');

const listeningPort = process.env['LISTENING_PORT'] || 8080;
const app = express();

app.use(express.static('dist'));
app.get('/healthy', (request, response) => response.status(200));

app.listen(listeningPort, function () {
    console.info(`server listening on port http://0.0.0.0:${listeningPort}`);
});
