import { ObjectId } from "mongodb";

// schema de pelicula con los tipos de dato correspondientes
const Pelicula = {
    _id: ObjectId,
    nombre: String,
    generos: Array,
    anioEstreno: Number
};

export default Pelicula;
