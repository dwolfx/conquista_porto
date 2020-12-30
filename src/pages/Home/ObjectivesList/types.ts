import { IObjectiveList } from 'store/modules/Objective/types'

export interface IObjectivesListProps {
  objectives: IObjectiveList[]
  isLoading: boolean
  hasError: boolean
  onRedirect: (path: string) => void
}

export interface IObjectiveProps {
  objective: IObjectiveList
}
