import { call, put } from 'redux-saga/effects'
import { get, post, put as axiosPut, remove } from 'services/api'

import { CleanObjectiveData } from '../Objective/action'
import { IRecommendations } from '../Objective/types'
import { getData, postData, deleteObjective } from './sagas'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
} from './action'
import {
  IDeleteObjectiveRequest,
  IGetObjectiveManagementDataRequest,
  IObjectManagement,
  IPostObjectiveManagementDataRequest,
} from './types'

const objectiveMock: IObjectManagement = require('mocks/objective.json')
const recommedationMock: IRecommendations = require('mocks/recommendation.json')

describe('ObjectiveManagement Sagas', () => {
  // Mock JSON.parse toast err.message
  JSON.parse = jest.fn().mockImplementation(() => ({
    msg: `Cannot read property 'data' of undefined`,
  }))

  describe('postData function', () => {
    it('GET: postData: success triggers success action', () => {
      const param: IPostObjectiveManagementDataRequest = {
        type: 'POST_REQUEST',
        data: { ...recommedationMock },
        pushHistory: () => {},
        addToast: () => {},
        onSuccess: () => {},
        onError: () => {},
      }

      const generator = postData(param)
      const response = { data: { ...objectiveMock } }

      expect(generator.next().value).toEqual(call(post, `/goals`, param.data))

      expect(generator.next(response).value).toEqual(
        put(PostObjectiveManagementDataSuccess(response.data))
      )

      expect(generator.next().value).toEqual(put(CleanObjectiveData()))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: postData: fail triggers fail action', () => {
      const param: IPostObjectiveManagementDataRequest = {
        type: 'POST_REQUEST',
        data: {},
        pushHistory: () => {},
        addToast: () => {},
        onSuccess: () => {},
        onError: () => {},
      }

      const generator = postData(param)
      const response = undefined

      expect(generator.next().value).toEqual(call(post, `/goals`, {}))

      expect(generator.next(response).value).toEqual(
        put(PostObjectiveManagementDataFailure())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getData function', () => {
    it('GET: getData: success triggers success action', () => {
      const param: IGetObjectiveManagementDataRequest = {
        type: 'GET_REQUEST',
        id: 1,
        addToast: () => {},
      }

      const generator = getData(param)
      const response = { data: { ...objectiveMock } }

      expect(generator.next().value).toEqual(call(get, `/goals/${param.id}`))

      expect(generator.next(response).value).toEqual(
        put(GetObjectiveManagementDataSuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getData: success triggers success action return null', () => {
      const param: IGetObjectiveManagementDataRequest = {
        type: 'GET_REQUEST',
        id: 1,
        addToast: () => {},
      }

      const generator = getData(param)
      const response = { data: null }

      expect(generator.next().value).toEqual(call(get, `/goals/${param.id}`))

      expect(generator.next(response).value).toEqual(
        put(GetObjectiveManagementDataFailure())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getData: failure triggers failure action', () => {
      const param: IGetObjectiveManagementDataRequest = {
        type: 'GET_REQUEST',
        id: null,
        addToast: () => {},
      }
      const generator = getData(param)
      const response = undefined
      expect(generator.next(response).value).toEqual(
        put(GetObjectiveManagementDataFailure())
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('deleteObjective function', () => {
    it('GET: deleteObjective: success triggers success action', () => {
      const param: IDeleteObjectiveRequest = {
        type: 'DELETE_REQUEST',
        id: 1,
        pushHistoryToHomeScreen: () => {},
        addToast: () => {},
      }

      const generator = deleteObjective(param)

      expect(generator.next().value).toEqual(call(remove, `/goals/${param.id}`))

      expect(generator.next().value).toEqual(put(DeleteObjectiveSuccess()))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: deleteObjective: fail triggers fail action', () => {
      // Mock JSON.parse toast err.message
      JSON.parse = jest.fn().mockImplementationOnce(() => ({
        msg: `pushHistoryToHomeScreen is not a function`,
      }))

      const param = {
        payload: {
          id: 1,
          pushHistoryToHomeScreen: () => {},
          addToast: () => {},
        },
      }

      const generator = deleteObjective({ addToast: () => {} })

      expect(generator.next().value).toEqual(call(remove, `/goals/undefined`))
      // generator.next()

      expect(generator.next().value).toEqual(put(DeleteObjectiveFailure()))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
