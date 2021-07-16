import express, { Application, Request, Response, Router } from 'express'
import productsRouter from './routes/products'
import userRouter from './routes/users'
const db = require('./config/db')

// Instance d'express
const app: Application = express();
const router: Router = express.Router()


// Port du serveur
const port = 3000

// Initialiser les routes
productsRouter(router)
userRouter(router)


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
