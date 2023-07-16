const http = require("http");
const app = require("./src/app");
const { connectDb } = require("./src/config/db");

const server = http.createServer(app);

const port = process.env.PORT;
connectDb().then(() => {
  server.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
  );
});
