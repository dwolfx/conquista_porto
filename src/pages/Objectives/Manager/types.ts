import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

export interface IState {
  objectiveManagement: {
    data: IObjectManagement
    isLoading: boolean
    isLoadingDelete: boolean
    otherGoalsManagement: boolean
    isLoadingOtherGoals: boolean
  }
}

export interface ILocationParams {
  objectiveId?: string
  pageRecommendation?: string
}
