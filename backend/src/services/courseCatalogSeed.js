const fs = require('fs')
const path = require('path')
const CourseCatalog = require('../models/CourseCatalog')

const DEFAULT_KEY = 'default'
const SEED_FILE = path.resolve(__dirname, '..', 'courses.seed.json')

const loadSeedData = () => {
  const raw = fs.readFileSync(SEED_FILE, 'utf8')
  return JSON.parse(raw)
}

const seedCourseCatalog = async () => {
  const seedData = loadSeedData()

  await CourseCatalog.findOneAndUpdate(
    { key: DEFAULT_KEY },
    {
      key: DEFAULT_KEY,
      meta: seedData.meta || {},
      courses: seedData.courses || [],
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
}

module.exports = {
  seedCourseCatalog,
  DEFAULT_KEY,
}
