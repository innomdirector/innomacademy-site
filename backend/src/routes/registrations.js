const express = require('express')
const Registration = require('../models/Registration')
const sendTelegramMessage = require('../services/telegram')

const router = express.Router()

const buildTelegramMessage = (payload) => {
  const lines = [
    '<b>ახალი რეგისტრაცია გვაქვს ბატონო მერაბ</b>',
    '',
    `სახელი: ${payload.firstName} ${payload.lastName}`,
    `ასაკი: ${payload.age}`,
    `Email: ${payload.email}`,
    `კურსი: ${payload.course}`,
    `ტელეფონი: ${payload.phone}`,
  ]

  if (payload.parentPhone) {
    lines.push(`მშობლის ტელ: ${payload.parentPhone}`)
  }

  if (payload.note) {
    lines.push(`კომენტარი: ${payload.note}`)
  }

  return lines.join('\n')
}

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      email,
      course,
      phone,
      parentPhone,
      note,
    } = req.body

    if (!firstName || !lastName || !age || !email || !course || !phone || !parentPhone) {
      return res.status(400).json({ message: 'გთხოვთ შეავსოთ ყველა სავალდებულო ველი.' })
    }

    const parsedAge = Number(age)
    if (Number.isNaN(parsedAge) || parsedAge < 10 || parsedAge > 28) {
      return res.status(400).json({ message: 'ასაკი უნდა იყოს 10-დან 28 წლამდე.' })
    }

    const phoneRegex = /^(?:\+995)?5\d{8}$/
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'ტელეფონის ნომერი უნდა იყოს ქართული ფორმატით.' })
    }
    if (!phoneRegex.test(parentPhone)) {
      return res.status(400).json({ message: 'მშობლის ნომერი უნდა იყოს ქართული ფორმატით.' })
    }

    const registration = await Registration.create({
      firstName,
      lastName,
      age: parsedAge,
      email,
      course,
      phone,
      parentPhone,
      note,
    })

    const message = buildTelegramMessage(registration)
    try {
      await sendTelegramMessage(
        process.env.TELEGRAM_BOT_TOKEN,
        process.env.TELEGRAM_CHAT_ID,
        message
      )
    } catch (error) {
      console.warn('Telegram notification failed:', error.message)
    }

    return res.status(201).json({
      message: 'Registration saved.',
      id: registration._id,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router
