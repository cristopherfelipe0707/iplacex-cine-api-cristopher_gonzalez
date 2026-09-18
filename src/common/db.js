import { MongoClient, ServerApiVersion } from "mongodb";

// uri de conexion al cluster de atlas
const uri = "mongodb+srv://cristopherfelipe91_db_user:4qNUYeQF0ptlEeFU@cine-db.bvmjgnl.mongodb.net/?appName=cine-db";

// se crea el cliente con la configuracion de la api estable
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

export default client;
