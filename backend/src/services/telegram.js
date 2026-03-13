const https = require('https')
const querystring = require('querystring')

const sendTelegramMessage = (token, chatId, text) => {
  if (!token || !chatId || !text) return Promise.resolve(false)

  const postData = querystring.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  })

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true)
          return
        }
        resolve(false)
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}

module.exports = sendTelegramMessage
