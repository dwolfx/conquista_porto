type step = 1 | 2 | 3 | 4 | 5 | null

export interface IProps {
  actualStep?: step
  totalNumberOfSteps?: step
  showSteps?: boolean
  title: string
}
