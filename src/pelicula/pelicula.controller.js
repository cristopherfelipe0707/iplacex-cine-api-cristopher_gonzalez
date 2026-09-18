import client from "../common/db.js";
import { ObjectId } from "mongodb";
import Pelicula from "./pelicula.js";

// acceso a la base de datos y coleccion de peliculas
const peliculaCollection = client.db("cine-db").collection("peliculas");

// controlador para insertar una pelicula
const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const nuevaPelicula = {
            nombre: req.body.nombre,
            generos: req.body.generos,
            anioEstreno: req.body.anioEstreno
        };

        peliculaCollection.insertOne(nuevaPelicula)
            .then(resultado => {
                res.status(201).json({ mensaje: "Pelicula creada", data: resultado });
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al insertar pelicula", error: error.message });
            });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
};

// controlador para obtener todas las peliculas
const handleGetPeliculasRequest = async (req, res) => {
    peliculaCollection.find().toArray()
        .then(peliculas => {
            res.status(200).json(peliculas);
        })
        .catch(error => {
            res.status(500).json({ mensaje: "Error al obtener peliculas", error: error.message });
        });
};

// controlador para obtener una pelicula por su id
const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.findOne({ _id: id })
            .then(pelicula => {
                if (pelicula) {
                    res.status(200).json(pelicula);
                } else {
                    res.status(404).json({ mensaje: "Pelicula no encontrada" });
                }
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al buscar pelicula", error: error.message });
            });
    } catch (error) {
        res.status(400).json({ mensaje: "Id mal formado" });
    }
};

// controlador para actualizar una pelicula por su id
const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.updateOne({ _id: id }, { $set: req.body })
            .then(resultado => {
                if (resultado.matchedCount > 0) {
                    res.status(200).json({ mensaje: "Pelicula actualizada", data: resultado });
                } else {
                    res.status(404).json({ mensaje: "Pelicula no encontrada" });
                }
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al actualizar pelicula", error: error.message });
            });
    } catch (error) {
        res.status(400).json({ mensaje: "Id mal formado" });
    }
};

// controlador para eliminar una pelicula por su id
const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.deleteOne({ _id: id })
            .then(resultado => {
                if (resultado.deletedCount > 0) {
                    res.status(200).json({ mensaje: "Pelicula eliminada" });
                } else {
                    res.status(404).json({ mensaje: "Pelicula no encontrada" });
                }
            })
            .catch(error => {
                res.status(500).json({ mensaje: "Error al eliminar pelicula", error: error.message });
            });
    } catch (error) {
        res.status(400).json({ mensaje: "Id mal formado" });
    }
};

export {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};
