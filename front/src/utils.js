// формат даты для россии
export const formatDate = (date) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('ru').format(new Date(date))
}

// форматирование даты и времени
export const formatDateTime = (date) => {
  if (!date) return ''
  const opions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return new Intl.DateTimeFormat('ru', opions).format(new Date(date))
}

export const formatDateTimeShort = (date) => {
  if (!date) return ''
  const opions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return new Intl.DateTimeFormat('ru', opions).format(new Date(date))
}

// получить текущий год
export const getYearFromDate = (value) => {
  if (!value) return ''
  const date = new Date(value).getFullYear()
  return date
}
