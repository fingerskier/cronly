import 'dotenv/config'

import auth from './middleware/auth.js'
import express from 'express'
import cronRoutes from './routes/cron.js'
import path from 'path'
import scriptsRoutes from './routes/scripts.js'
import userRoutes from './routes/users.js'
import loginRouter from './api/auth.js'


const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1)
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Serve static files from the ui directory
const staticPath = path.join(__dirname, 'ui')

app.use('/', express.static(staticPath))

app.all('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: (new Date()).toISOString(),
  })
})

// Public API routes
app.use('/api/auth', loginRouter)

// Protected API routes
app.use('/api/users', auth, userRoutes)
app.use('/api/cron', auth, cronRoutes)
app.use('/api/scripts', auth, scriptsRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})