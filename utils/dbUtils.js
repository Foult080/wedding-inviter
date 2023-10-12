// prepare object before insert
const prepareBeforeInsert = (data) => {
  const fields = Object.keys(data).join(', ')
  const params = Object.values(data)
  const values = []
  params.forEach(() => values.push('?'))
  return { fields, values, params }
}

// prepare objects to update
const prepareToUpdate = (findObject, data) => {
  const fields = Object.keys(data).join(' = ?, ').concat(' = ? ')
  const whereField = Object.keys(findObject).join('')
  const where = whereField + ' = ? '
  const params = Object.values(data)
  params.push(findObject[whereField])
  return { fields, where, params }
}

module.exports = { prepareBeforeInsert, prepareToUpdate }
