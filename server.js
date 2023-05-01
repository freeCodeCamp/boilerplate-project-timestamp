const http = require("http");
const app = require(".");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

var onListening = () => {
  console.log(`Your app is listening on port ${PORT}`);
};

server.on("listening", onListening);

server.listen(PORT);
