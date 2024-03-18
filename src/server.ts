import express from "express";
import router from "./router";
import db from "./config/db";

// Conectar a la Base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectar la base de datos.");
  }
}

connectDB();
const server = express();
server.use("/api/products", router);

export default server;
