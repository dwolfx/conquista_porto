export interface IObjective {
  id: string
  nickname: string
  percentage: number
  remaining_value: number
  target_value: number
  total_balance: number
}

export interface IObjectivesListProps {
  objectives: IObjective[]
  isLoading: boolean
  hasError: boolean
  onRedirect: (path: string) => void
}

export interface IObjectiveProps {
  objective: IObjective
}