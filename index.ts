require('dotenv').config()
import express, { Application, Request, Response, Router } from 'express'
import productsRouter from './routes/products'
import userRouter from './routes/users'
import topicsRouter from './routes/topics'

const db = require('./config/db')

// Instance d'express
const app: Application = express();
const router: Router = express.Router()


// Port du serveur
const port = process.env.PORT

// Initialiser les routes
productsRouter(router)
userRouter(router)
topicsRouter(router)


// Use the router
app.use(express.json())
app.use(router)

// Première route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello world" })
})

// Démarrer le serveur
app.listen(port, () => {
    console.log("Server is running on port " + port)
})
