const express = require('express')
const CourseCatalog = require('../models/CourseCatalog')
const { DEFAULT_KEY } = require('../services/courseCatalogSeed')

const router = express.Router()

const getCatalog = () => (
  CourseCatalog.findOne({ key: DEFAULT_KEY }).lean()
)

router.get('/', async (_req, res) => {
  try {
    const catalog = await getCatalog()
    if (!catalog) {
      return res.status(404).json({ message: 'Courses catalog is not available.' })
    }

    return res.json({
      meta: catalog.meta || {},
      courses: catalog.courses || [],
    })
  } catch (_error) {
    return res.status(500).json({ message: 'Server error.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const numericId = Number(req.params.id)
    if (!Number.isInteger(numericId)) {
      return res.status(400).json({ message: 'Invalid course id.' })
    }

    const catalog = await getCatalog()
    if (!catalog) {
      return res.status(404).json({ message: 'Courses catalog is not available.' })
    }

    const course = (catalog.courses || []).find((item) => item.id === numericId)
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' })
    }

    return res.json({
      meta: catalog.meta || {},
      course,
    })
  } catch (_error) {
    return res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router
