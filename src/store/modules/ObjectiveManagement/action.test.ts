import { Types } from './types'
import {
  PostObjectiveManagementDataRequest,
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsRequest,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
  GetObjectiveManagementDataRequest,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  GetOtherGoalsDataRequest,
  GetOtherGoalsDataSuccess,
  GetOtherGoalsDataFailure,
  DeleteObjectiveRequest,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
  CleanObjectiveManagementData,
} from './action'

describe('ObjectiveManagement Actions', () => {
  test('if PostObjectiveManagementDataRequest returns the correct object', () => {
    const payload = {
      data: {},
      pushHistory: {},
      addToast: () => {},
      onSuccess: () => {},
    }
    expect(PostObjectiveManagementDataRequest(payload)).toEqual({
      type: Types.POST_REQUEST,
      ...payload,
    })
  })

  test('if PostObjectiveManagementDataSuccess returns the correct object', () => {
    const payload = {}

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

  test('if PostSaveFundsRequest returns the correct object', () => {
    const payload = {}

    expect(PostSaveFundsRequest(payload)).toEqual({
      type: Types.POST_SAVE_FUNDS_REQUEST,
      payload,
    })
  })

  test('if PostSaveFundsSuccess returns the correct object', () => {
    expect(PostSaveFundsSuccess()).toEqual({
      type: Types.POST_SAVE_FUNDS_SUCCESS,
    })
  })

  test('if PostSaveFundsFailure returns the correct object', () => {
    expect(PostSaveFundsFailure()).toEqual({
      type: Types.POST_SAVE_FUNDS_FAILURE,
    })
  })

  test('if GetObjectiveManagementDataRequest returns the correct object', () => {
    const payload = {}
    expect(GetObjectiveManagementDataRequest(payload)).toEqual({
      type: Types.GET_REQUEST,
      ...payload,
    })
  })

  test('if GetObjectiveManagementDataSuccess returns the correct object', () => {
    const payload = {}
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

  test('if GetOtherGoalsDataRequest returns the correct object', () => {
    const payload = {}
    expect(GetOtherGoalsDataRequest(payload)).toEqual({
      type: Types.GET_OTHER_GOALS_REQUEST,
      ...payload,
    })
  })

  test('if GetOtherGoalsDataSuccess returns the correct object', () => {
    const payload = {}
    expect(GetOtherGoalsDataSuccess(payload)).toEqual({
      type: Types.GET_OTHER_GOALS_SUCCESS,
      payload,
    })
  })

  test('if GetOtherGoalsDataFailure returns the correct object', () => {
    expect(GetOtherGoalsDataFailure()).toEqual({
      type: Types.GET_OTHER_GOALS_FAILURE,
    })
  })

  test('if DeleteObjectiveRequest returns the correct object', () => {
    const id = 1
    const pushHistoryToHomeScreen = true
    expect(DeleteObjectiveRequest(id, pushHistoryToHomeScreen)).toEqual({
      type: Types.DELETE_REQUEST,
      payload: { id, pushHistoryToHomeScreen },
    })
  })

  test('if DeleteObjectiveSuccess returns the correct object', () => {
    const payload = {}
    expect(DeleteObjectiveSuccess(payload)).toEqual({
      type: Types.DELETE_SUCCESS,
      payload,
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
})
