import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import ActorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ruta por defecto
app.get("/", (req, res) => {
    res.send("Bienvenido al cine Iplacex");
});

// rutas personalizadas con prefijo /api
app.use("/api", peliculaRoutes);
app.use("/api", ActorRoutes);

// conectar a atlas y luego levantar el servidor
client.connect()
    .then(() => {
        console.log("Conexion exitosa a MongoDB Atlas");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log("Error al conectar a MongoDB Atlas: " + error.message);
    });
