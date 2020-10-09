import { IObjectManagement } from './types'

interface IState {
  objectiveManagement: {
    data?: IObjectManagement
  }
}

export const getGoalId = (state: IState) => state.objectiveManagement.data?.id
