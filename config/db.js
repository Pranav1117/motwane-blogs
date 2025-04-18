const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_CONNECTION_STRING;

let client;
let db;

const connectToDB = async () => {
  if (db) return;
  try {
    client = await MongoClient.connect(uri);
    db = client.db("motwane-blogs");
  } catch (error) {
    throw new Error("error while connecting DB");
  }
};

const getDB = async () => {
  if (!db) throw new Error("Database not connected yet");
  return db;
};

module.exports = { connectToDB, getDB };
