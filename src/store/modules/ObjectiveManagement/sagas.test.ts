import { takeLatest, call, put } from 'redux-saga/effects'
import { get, post, remove } from 'services/api'

import {
  getData,
  postData,
  postSaveFunds,
  getOtherGoalsData,
  deleteObjective,
} from './sagas'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  GetOtherGoalsDataSuccess,
  GetOtherGoalsDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
} from './action'
import { CleanObjectiveData } from '../Objective/action'

describe('ObjectiveManagement Sagas', () => {
  describe('postData function', () => {
    it('GET: postData: success triggers success action', () => {
      const param = {
        data: {},
        pushHistory: () => {},
        onSuccess: () => {},
      }

      const generator = postData(param)
      const response = { data: {} }

      expect(generator.next().value).toEqual(
        call(post, `/goals`, response.data)
      )

      expect(generator.next(response).value).toEqual(
        put(PostObjectiveManagementDataSuccess(response.data))
      )

      expect(generator.next().value).toEqual(put(CleanObjectiveData()))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: postData: fail triggers fail action', () => {
      const param = {
        data: {},
        pushHistory: 'history',
        onSuccess: () => {},
      }

      const generator = postData(param)
      const response = undefined

      expect(generator.next().value).toEqual(call(post, `/goals`, {}))

      expect(generator.next(response).value).toEqual(
        put({
          ...PostObjectiveManagementDataFailure(),
          toast: {
            message: "Cannot read property 'data' of undefined",
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('postSaveFunds function', () => {
    it('GET: postSaveFunds: success triggers success action', () => {
      const param = {
        payload: { idGoal: 1, data: {}, onSuccess: () => {} },
      }

      const generator = postSaveFunds(param)
      const response = { data: {} }

      expect(generator.next().value).toEqual(
        call(post, `/goals/${param.payload.idGoal}/funds`, {})
      )

      expect(generator.next(response).value).toEqual(
        put({
          ...PostSaveFundsSuccess({}),
          toast: {
            message: 'Alterações salvas com sucesso.',
            options: undefined,
            type: 'success',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: postSaveFunds: fail triggers fail action', () => {
      const param = {
        payload: { idGoal: 1, data: {}, onSuccess: () => {} },
      }

      const generator = postSaveFunds(param)
      const response = undefined

      expect(generator.next().value).toEqual(
        call(post, `/goals/${param.payload.idGoal}/funds`, {})
      )

      expect(generator.next(response).value).toEqual(
        put({
          ...PostSaveFundsFailure(),
          toast: {
            message: "Cannot read property 'data' of undefined",
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getData function', () => {
    it('GET: getData: success triggers success action', () => {
      const param = {
        id: 1,
        history: ['path2'],
        path: 'path1',
      }

      const generator = getData(param)
      const response = { data: {} }

      expect(generator.next().value).toEqual(call(get, `/goals/${param.id}`))

      expect(generator.next(response).value).toEqual(
        put(GetObjectiveManagementDataSuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getData: success triggers success action return null', () => {
      const param = {
        id: 1,
        history: ['path2'],
        path: 'path1',
      }

      const generator = getData(param)
      const response = { data: null }

      expect(generator.next().value).toEqual(call(get, `/goals/${param.id}`))

      expect(generator.next(response).value).toEqual(
        put({
          ...GetObjectiveManagementDataFailure(),
          toast: {
            message: 'Nenhum objetivo encontrado.',
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getData: failure triggers failure action', () => {
      const param = {
        id: null,
        history: ['path2'],
        path: 'path1',
      }
      const generator = getData(param)
      const response = undefined
      expect(generator.next(response).value).toEqual(
        put({
          ...GetObjectiveManagementDataFailure(),
          toast: {
            message: 'Ocorreu um erro. Tente novamente mais tarde.',
            options: undefined,
            type: 'error',
          },
        })
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getOtherGoalsData function', () => {
    it('GET: getOtherGoalsData: success triggers success action', () => {
      const param = {
        id: '1',
        history: ['history1'],
        path: 'history2',
      }

      const generator = getOtherGoalsData(param)
      const response = { data: {} }

      expect(generator.next().value).toEqual(
        call(get, `/goals/bytype/${param.id}`)
      )

      expect(generator.next(response).value).toEqual(
        put(GetOtherGoalsDataSuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getOtherGoalsData: success triggers success action return null', () => {
      const param = {
        id: '1',
        history: ['history1'],
        path: 'history2',
      }

      const generator = getOtherGoalsData(param)
      const response = { data: null }

      expect(generator.next().value).toEqual(
        call(get, `/goals/bytype/${param.id}`)
      )

      expect(generator.next(response).value).toEqual(
        put({
          ...GetOtherGoalsDataFailure(),
          toast: {
            message: 'Nenhum objetivo encontrado.',
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getOtherGoalsData: fail triggers fail action', () => {
      const param = {
        id: '1',
        history: ['history1'],
        path: 'history2',
      }

      const generator = getOtherGoalsData(param)
      const response = undefined

      expect(generator.next().value).toEqual(
        call(get, `/goals/bytype/${param.id}`)
      )

      expect(generator.next(response).value).toEqual(
        put({
          ...GetOtherGoalsDataFailure(),
          toast: {
            message: "Cannot read property 'data' of undefined",
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: getOtherGoalsData: invalid param', () => {
      const param = {
        id: null,
        history: ['history1'],
        path: 'history2',
      }

      const generator = getOtherGoalsData(param)

      expect(generator.next().value).toEqual(
        put({
          ...GetOtherGoalsDataFailure(),
          toast: {
            message: 'Ocorreu um erro. Tente novamente mais tarde.',
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('deleteObjective function', () => {
    it('GET: deleteObjective: success triggers success action', () => {
      const param = {
        payload: { id: '1', pushHistoryToHomeScreen: () => {} },
      }

      const generator = deleteObjective(param)

      expect(generator.next().value).toEqual(
        call(remove, `/goals/${param.payload.id}`)
      )

      expect(generator.next().value).toEqual(
        put({
          ...DeleteObjectiveSuccess(),
          toast: {
            message: 'Objetivo deletado com sucesso.',
            options: undefined,
            type: 'success',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('GET: deleteObjective: fail triggers fail action', () => {
      const param = {
        payload: { id: '1', pushHistoryToHomeScreen: null },
      }

      const generator = deleteObjective(param)

      expect(generator.next().value).toEqual(
        call(remove, `/goals/${param.payload.id}`)
      )

      expect(generator.next().value).toEqual(
        put({
          ...DeleteObjectiveFailure(),
          toast: {
            message: 'pushHistoryToHomeScreen is not a function',
            options: undefined,
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
