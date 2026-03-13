const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const registrationsRouter = require('./routes/registrations')
const coursesRouter = require('./routes/courses')
const { seedCourseCatalog } = require('./services/courseCatalogSeed')

dotenv.config()

const app = express()

app.use(express.json({ limit: '1mb' }))

const allowedOrigin = process.env.FRONTEND_URL || '*'
app.use(
  cors({
    origin: allowedOrigin,
  })
)

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/registrations', registrationsRouter)
app.use('/api/courses', coursesRouter)

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    const shouldSeedCourses = process.env.SEED_COURSES_ON_START === 'true'
    if (shouldSeedCourses) {
      await seedCourseCatalog()
      console.log('Courses catalog seeded on startup.')
    }
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
