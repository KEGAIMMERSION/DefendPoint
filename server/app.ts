import express, {Application} from "express"
import cors from "cors"
import {logger} from "./middleware/logger.middleware"
import {errorHandler} from "./middleware/error.middleware"
import apiRoutes from "./routes"

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/api', apiRoutes)

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(errorHandler)

export default app