/* Usar esta função para bloquear uma lista de datas */
export const verifyIsDayBlocked = (
  day: moment.Moment,
  daysToBlock: moment.Moment[] | null | undefined
) => {
  return !!daysToBlock?.find(
    (dateItem: moment.Moment) =>
      day.date() === dateItem.date() &&
      day.month() === dateItem.month() &&
      day.year() === dateItem.year()
  )
}
