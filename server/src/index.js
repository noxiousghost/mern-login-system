const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

const connection = require("./db/connection");
connection();

app.use(express.json()); //body parser

const userRoute = require("./routes/user");
app.use(userRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
