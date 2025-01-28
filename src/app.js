import express from 'express'
import userRoutes from './routes/users.js'
import cronRoutes from './routes/cron.js'
import auth from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Serve static files from the ui directory
app.use('/', express.static('src/ui'))

// Public routes (user management)
app.use('/api/users', userRoutes)

// Protected routes (CRON management)
app.use('/api/cron', auth, cronRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})