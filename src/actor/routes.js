import express from "express";
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from "./actor.controller.js";

const ActorRoutes = express.Router();

// ruta para agregar actor
ActorRoutes.post("/actor", handleInsertActorRequest);

// ruta para obtener todos los actores
ActorRoutes.get("/actores", handleGetActoresRequest);

// ruta para obtener actor por id
ActorRoutes.get("/actor/:id", handleGetActorByIdRequest);

// ruta para obtener actores de una pelicula
ActorRoutes.get("/actor/:pelicula", handleGetActoresByPeliculaIdRequest);

export default ActorRoutes;
