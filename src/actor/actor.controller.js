import client from "../common/db.js";
import { ObjectId } from "mongodb";
import Actor from "./actor.js";

// acceso a la base de datos y coleccion de actores
const actorCollection = client.db("cine-db").collection("actores");
// tambien necesitamos acceder a peliculas para la validacion
const peliculaCollection = client.db("cine-db").collection("peliculas");

// controlador para insertar un actor
const handleInsertActorRequest = async (req, res) => {
    try {
        // primero validamos que la pelicula exista buscando por nombre
        const peliculaExiste = await peliculaCollection.findOne({ nombre: req.body.idPelicula });

        if (!peliculaExiste) {
            return res.status(404).json({ mensaje: "La pelicula asignada no existe en la base de datos" });
        }

        const nuevoActor = {
            idPelicula: req.body.idPelicula,
            nombre: req.body.nombre,
            edad: req.body.edad,
            estaRetirado: req.body.estaRetirado,
            premios: req.body.premios
        };

        actorCollection.insertOne(nuevoActor)
            .then(resultado => {
                res.status(201).json({ mensaje: "Actor creado", data: resultado });
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al insertar actor", error: error.message });
            });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
};

// controlador para obtener todos los actores
const handleGetActoresRequest = async (req, res) => {
    actorCollection.find().toArray()
        .then(actores => {
            res.status(200).json(actores);
        })
        .catch(error => {
            res.status(500).json({ mensaje: "Error al obtener actores", error: error.message });
        });
};

// controlador para obtener un actor por su id
const handleGetActorByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        actorCollection.findOne({ _id: id })
            .then(actor => {
                if (actor) {
                    res.status(200).json(actor);
                } else {
                    res.status(404).json({ mensaje: "Actor no encontrado" });
                }
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al buscar actor", error: error.message });
            });
    } catch (error) {
        res.status(400).json({ mensaje: "Id mal formado" });
    }
};

// controlador para obtener actores por id de pelicula
const handleGetActoresByPeliculaIdRequest = async (req, res) => {
    try {
        const peliculaId = new ObjectId(req.params.pelicula);

        // verificamos que la pelicula exista
        const pelicula = await peliculaCollection.findOne({ _id: peliculaId });

        if (!pelicula) {
            return res.status(404).json({ mensaje: "Pelicula no encontrada" });
        }

        // buscamos los actores que tengan el nombre de esa pelicula
        actorCollection.find({ idPelicula: pelicula.nombre }).toArray()
            .then(actores => {
                res.status(200).json(actores);
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al buscar actores", error: error.message });
            });
    } catch (error) {
        res.status(400).json({ mensaje: "Id mal formado" });
    }
};

export {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
