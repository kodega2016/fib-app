const express = require("express");
const app = express();

// setup redis client
const redis = require("redis");
const { REDIS_HOST, REDIS_PORT } = require("./keys");

const redis_client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

// setup postgres client
const { Pool } = require("pg");
const {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
} = require("./keys");


const pg_client = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
});

pg_client.on("error", () => {
  console.log("Lost PG connection");
});

pg_client.query("CREATE TABLE IF NOT EXISTS values (number INT)");

app.get("/", (req, res) => {
  res.send("Hi");
});


app.get("/values/all", async (req, res) => {
    const values = await pg_client.query("SELECT * from values");
    res.send(values.rows);
})

app.get("/values/current", async (req, res) => {
    redis_client.hGetAll("values", (err, values) => {
        res.send(values);
    });
})

const server = app.listen(5000, () => {
  console.log("Listening on port 5000");
});

process.on("uncaughtException", (err) => {
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
