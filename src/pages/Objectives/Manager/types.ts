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

export interface ISummaryObjectives {
  id: number
  nickname: string
  total_balance: number
  remaining_value: number
  target_value: number
  percentage: number
  goal_type: string
}

export interface IFundsCardsMobile {
  showInfoCardOnMobile?: boolean
}
