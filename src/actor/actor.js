import { ObjectId } from "mongodb";

// schema de actor con sus propiedades
const Actor = {
    _id: ObjectId,
    idPelicula: String,
    nombre: String,
    edad: Number,
    estaRetirado: Boolean,
    premios: Array
};

export default Actor;
