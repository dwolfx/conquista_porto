import moment, { Moment } from 'moment'

export const isInvalidDate = (value: string | Moment) =>
  !moment(value, 'DD/MM/YYYY', true).isValid()

export const isToday = (value: string | Moment) =>
  moment().isSame(moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD'), 'day')

export const isPastDate = (
  inputValue: string | Moment,
  operationDate: string | Moment
) => {
  const date1 = moment(inputValue, 'DD/MM/YYYY').format('YYYY-MM-DD')
  const date2 = moment(operationDate).format('YYYY-MM-DD')

  return moment(date1).isBefore(date2)
}

export const isWeekend = (value: string | Moment) => {
  // 6 = Saturday, 0 = Sunday
  const dayNumber = moment(
    moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  ).day()

  return dayNumber === 6 || dayNumber === 0
}

export const isBeforeLimitHour = (hour: string) =>
  moment().isBefore(
    moment(moment(hour, 'hh:mm').format('HH:mm:ss'), 'HH:mm:ss')
  )

export const formatMoneyToNumber = (str: string) => {
  return +str.replace(/\./g, '').replace(',', '.')
}
