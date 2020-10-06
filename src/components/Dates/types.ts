export interface IIntervalDateType {
  MONTH: string
  WEEK: string
  RANGE: string
}

export const INTERVAL_DATE_TYPE: IIntervalDateType = {
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  RANGE: 'RANGE',
}

export interface IRangeDates {
  dateBegin: moment.Moment | null
  dateEnd: moment.Moment | null
  intervalDateType: string
}
