import moment, { Moment } from 'moment'

export const isInvalidDate = (value: string | Moment) =>
  !moment(value, 'DD/MM/YYYY', true).isValid()

export const isToday = (value: string | Moment) =>
  moment(moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY')).isSame(
    moment().format('DD/MM/YYYY')
  )

export const isPastDate = (value: string | Moment) =>
  moment(moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY')).isBefore(
    moment().format('DD/MM/YYYY')
  )

export const isTodayAndBefore15pm = (value: string | Moment) =>
  moment(moment(value, 'DD/MM/YYYY'), 'hh:mm:ss').isBefore(
    moment('15:00:00', 'hh:mm:ss')
  )

export const formatMoneyToNumber = (str: string) => {
  return +str.replace('.', '').replace(',', '.')
}
