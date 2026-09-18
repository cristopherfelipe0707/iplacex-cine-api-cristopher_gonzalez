import express from "express";
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from "./pelicula.controller.js";

const peliculaRoutes = express.Router();

// ruta para agregar pelicula
peliculaRoutes.post("/pelicula", handleInsertPeliculaRequest);

// ruta para obtener todas las peliculas
peliculaRoutes.get("/peliculas", handleGetPeliculasRequest);

// ruta para obtener pelicula por id
peliculaRoutes.get("/pelicula/:id", handleGetPeliculaByIdRequest);

// ruta para actualizar pelicula por id
peliculaRoutes.put("/pelicula/:id", handleUpdatePeliculaByIdRequest);

// ruta para eliminar pelicula por id
peliculaRoutes.delete("/pelicula/:id", handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
