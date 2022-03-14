// conectar con la BD e inicar el server
import app from "./server.js"
import mongodb from "mongodb"
// enviroment variables
import dotenv from "dotenv"
dotenv.config()
//accesar al MongoClient
const MongoClient = mongodb.MongoClient

//leyendo y definiendo los puertos en caso de
const port = process.env.PORT || 8000

// conectar a la BD
MongoClient.connect(
    //direccion de la BD
    process.env.RESTREVIEWS_DB_URI,
    {
        // opciones para configurar a la BD
        poolSize: 50,
        //request del timeout
        wtimeout: 2500,
        useNewUrlParse: true }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})