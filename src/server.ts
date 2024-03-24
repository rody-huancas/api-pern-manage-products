import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";
import cors, { CorsOptions } from "cors";

// Conectar a la Base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("Conexión exitosa a la base de datos."));
  } catch (error) {
    // console.log(error);
    console.log( colors.red("Hubo un error al conectar la base de datos."));
  }
}

connectDB();
// instancia de express
const server = express();
// permitir conexiones
const cosrsOptions: CorsOptions = {
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    } 
  }
}

server.use(cors(cosrsOptions));

// leer datos de formulario
server.use(express.json())
server.use("/api/products", router);

export default server;
