import 'dotenv/config'

import express from 'express'
import cronRoutes from './routes/cron.js'
import scriptsRoutes from './routes/scripts.js'
import userRoutes from './routes/users.js'
import auth from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// all routes protected by auth
app.use(auth)

// Serve static files from the ui directory
app.use('/', express.static('src/ui'))

app.all('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: (new Date()).toISOString(),
  })
})

// Public routes (user management)
app.use('/api/users', userRoutes)

  // Protected routes (CRON management)
app.use('/api/cron', cronRoutes)

app.use('/api/scripts', scriptsRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})