const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectToDB } = require("./config/db");
const router = require("./routes/router");

dotenv.config();
app.use(express.json());

app.use("/api/v1/", router);

app.get("/", async (req, res) => {
  res.send("welcome to home page");
});

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(3000, () => {
      console.log("server runnning on 3000");
    });
  } catch (error) {
    console.log("error while connecting db");
  }
};

startServer();
