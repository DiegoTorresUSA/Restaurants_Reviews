//
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// iniciando express para usar el server
const app = express()

// lo que express va a usar
app.use(cors())

// nuestro server puede aceptar un JSON enviado
app.use(express.json())

//definiendo las rutas- debemos definir si es una API,
// y la ruta que va a estar en la ruta restaurant
app.use("/api/v1/restaurants", restaurants)

// en caso que el usuario digite la direccion incorrecta
//lo que vamos a contestar
app.use("*", (req, res) => res.status(404).json({ error: "nor found"}))

export default app
