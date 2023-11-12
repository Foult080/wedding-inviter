const router = require('express').Router()
const version = require('../package.json').version
const db = require('../utils/db.js')

// api routes
// check health route
router.get('/health', async (req, res) => {
  return res.status(200).json({ success: true, version, msg: 'Сервис работает стабильно' })
})

// get guests
router.get('/guests', async (req, res) => {
  try {
    const [guests] = await db.query('select id, guest, invite_msg, additional_guest, guest_count, status, mddate from guests order by guest asc')
    const [guestsCount] = await db.query('select sum(guest_count) as guests from guests where status = 2')
    return res.status(200).json({ success: true, data: guests, count: guests.length, guestsCount: guestsCount[0] })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Error', error })
  }
})

// get guest info
router.get('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await db.query('select id, guest, invite_msg, tel_number,additional_guest, guest_count, status, mddate from guests where id = ?', [id])
    return res.status(200).json({ success: true, data: rows[0] })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Error', error })
  }
})

// change status
router.put('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { guest, additionalGuest, telNumber, guestCount, status } = req.body
    const mddate = new Date()
    await db.query('update guests set guest = ?, additional_guest = ?, tel_number = ?, guest_count = ?, status = ?, mddate = ? where id = ?', [
      guest,
      additionalGuest,
      telNumber,
      guestCount,
      status,
      mddate,
      id
    ])

    return res.status(200).json({ success: true, msg: 'Запись успешно изменена' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Error', error })
  }
})

// reject invite
router.delete('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params
    const mddate = new Date()
    await db.query('update guests set mddate = ?, status = 3, guest_count = null where id = ?', [mddate, id])
    return res.status(200).json({ msg: 'Запись успешно изменена' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal error', error })
  }
})

// 404 not found
router.use('*', async (req, res) => {
  res.status(404).json({ success: false, msg: 'Маршрут не распознан' })
})

module.exports = router
