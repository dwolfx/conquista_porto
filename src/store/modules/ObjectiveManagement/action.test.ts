import { IRecommendations } from '../Objective/types'
import {
  Types,
  IPostObjectiveManagementDataRequest,
  IObjectManagement,
} from './types'
import {
  PostObjectiveManagementDataRequest,
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  GetObjectiveManagementDataRequest,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  DeleteObjectiveRequest,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
  CleanObjectiveManagementData,
  PutObjectiveFundsMovementRequest,
  PutObjectiveFundsMovementFailure,
  PutObjectiveFundsMovementSuccess,
  TransferBetweenObjectivesRequest,
  TransferBetweenObjectivesSuccess,
  TransferBetweenObjectivesFailure,
  UpdateObjectiveNicknameRequest,
  UpdateObjectiveNicknameSuccess,
  UpdateObjectiveNicknameFailure,
} from './action'

const RecommendationMock: IRecommendations = require('mocks/recommendation.json')
const ObjectiveDetailsMock: IObjectManagement = require('mocks/objective.json')

describe('ObjectiveManagement Actions', () => {
  test('if PostObjectiveManagementDataRequest returns the correct object', () => {
    const payload: Omit<IPostObjectiveManagementDataRequest, 'type'> = {
      data: RecommendationMock,
      pushHistory: () => null,
      addToast: () => {},
      onSuccess: () => {},
      onError: () => {},
    }
    expect(PostObjectiveManagementDataRequest(payload)).toEqual({
      type: Types.POST_REQUEST,
      ...payload,
    })
  })

  test('if PostObjectiveManagementDataSuccess returns the correct object', () => {
    const payload = ObjectiveDetailsMock

    expect(PostObjectiveManagementDataSuccess(payload)).toEqual({
      type: Types.POST_SUCCESS,
      payload,
    })
  })

  test('if PostObjectiveManagementDataFailure returns the correct object', () => {
    expect(PostObjectiveManagementDataFailure()).toEqual({
      type: Types.POST_FAILURE,
    })
  })

  test('if GetObjectiveManagementDataRequest returns the correct object', () => {
    const payload = {
      id: 1,
      onSuccess: () => null,
      onError: () => null,
      addToast: () => null,
    }
    expect(GetObjectiveManagementDataRequest(payload)).toEqual({
      type: Types.GET_REQUEST,
      ...payload,
    })
  })

  test('if GetObjectiveManagementDataSuccess returns the correct object', () => {
    const payload = ObjectiveDetailsMock
    expect(GetObjectiveManagementDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetObjectiveManagementDataFailure returns the correct object', () => {
    expect(GetObjectiveManagementDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  test('if DeleteObjectiveRequest returns the correct object', () => {
    const payload = {
      id: 1,
      pushHistoryToHomeScreen: () => null,
      addToast: () => null,
    }
    expect(DeleteObjectiveRequest(payload)).toEqual({
      type: Types.DELETE_REQUEST,
      ...payload,
    })
  })

  test('if DeleteObjectiveSuccess returns the correct object', () => {
    expect(DeleteObjectiveSuccess()).toEqual({
      type: Types.DELETE_SUCCESS,
    })
  })

  test('if DeleteObjectiveFailure returns the correct object', () => {
    expect(DeleteObjectiveFailure()).toEqual({
      type: Types.DELETE_FAILURE,
    })
  })

  test('if CleanObjectiveManagementData returns the correct object', () => {
    expect(CleanObjectiveManagementData()).toEqual({
      type: Types.CLEAN_DATA,
    })
  })

  it('should call PutObjectiveFundsMovementRequest', () => {
    const payload = {
      data: {
        fund_list: [
          {
            fund_id: 5105,
            value: 1000,
          },
        ],
      },
      addToast: () => null,
    }
    expect(PutObjectiveFundsMovementRequest(payload)).toEqual({
      type: Types.PUT_FUNDS_MOVEMENT_REQUEST,
      ...payload,
    })
  })

  it('should call PutObjectiveFundsMovementSuccess', () => {
    expect(PutObjectiveFundsMovementSuccess(ObjectiveDetailsMock)).toEqual({
      type: Types.PUT_FUNDS_MOVEMENT_SUCCESS,
      payload: ObjectiveDetailsMock,
    })
  })

  it('should call PutObjectiveFundsMovementFailure', () => {
    expect(PutObjectiveFundsMovementFailure()).toEqual({
      type: Types.PUT_FUNDS_MOVEMENT_FAILURE,
    })
  })

  it('should call TransferBetweenObjectivesRequest', () => {
    const payload = {
      data: {
        fund_id: 5105,
        value: 2000,
        from_goal_id: 1,
        to_goal_id: 7,
      },
      addToast: () => null,
    }
    expect(TransferBetweenObjectivesRequest(payload)).toEqual({
      type: Types.TRANSFER_BETWEEN_OBJECTIVES_REQUEST,
      ...payload,
    })
  })

  it('should call TransferBetweenObjectivesSuccess', () => {
    expect(TransferBetweenObjectivesSuccess(ObjectiveDetailsMock)).toEqual({
      type: Types.TRANSFER_BETWEEN_OBJECTIVES_SUCCESS,
      payload: ObjectiveDetailsMock,
    })
  })

  it('should call TransferBetweenObjectivesFailure', () => {
    expect(TransferBetweenObjectivesFailure()).toEqual({
      type: Types.TRANSFER_BETWEEN_OBJECTIVES_FAILURE,
    })
  })

  it('should call UpdateObjectiveNicknameRequest', () => {
    const payload = {
      id: 1,
      nickname: 'new nickname',
      addToast: () => null,
    }
    expect(UpdateObjectiveNicknameRequest(payload)).toEqual({
      type: Types.UPDATE_OBJECTIVE_NICKNAME_REQUEST,
      ...payload,
    })
  })

  it('should call UpdateObjectiveNicknameSuccess', () => {
    expect(UpdateObjectiveNicknameSuccess('new nickname')).toEqual({
      type: Types.UPDATE_OBJECTIVE_NICKNAME_SUCCESS,
      payload: 'new nickname',
    })
  })

  it('should call UpdateObjectiveNicknameFailure', () => {
    expect(UpdateObjectiveNicknameFailure()).toEqual({
      type: Types.UPDATE_OBJECTIVE_NICKNAME_FAILURE,
    })
  })
})
