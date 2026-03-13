const dotenv = require('dotenv')
const connectDb = require('../config/db')
const { seedCourseCatalog } = require('../services/courseCatalogSeed')

dotenv.config()

const run = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    await seedCourseCatalog()
    console.log('Courses catalog seeded successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Failed to seed courses catalog:', error.message)
    process.exit(1)
  }
}

run()
