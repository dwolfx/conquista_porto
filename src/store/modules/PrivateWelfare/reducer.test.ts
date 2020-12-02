import reducer from './reducer'
import { Types } from './types'
import privateWelfareResponse from 'mocks/privateWelfare.json'
import privateWelfateWithStatusPREResponse from 'mocks/privateWelfateWithStatusPRE.json'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
  isEmpty: false,
  dataStatusPRE: null,
  hasErrorStatusPRE: false,
  isLoadingStatusPRE: false,
}

describe('PrivateWelfare reducer tests', () => {
  describe('PrivateWelfare state', () => {
    it('should return INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })
    it('should handle PRIVATE_WELFARE_REQUEST', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_REQUEST,
        })
      ).toEqual({
        ...INITIAL_STATE,
        data: null,
        hasError: false,
        isLoading: true,
        isEmpty: false,
      })
    })
    it('should handle PRIVATE_WELFARE_SUCCESS', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_SUCCESS,
          payload: privateWelfareResponse,
        })
      ).toEqual({
        ...INITIAL_STATE,
        hasError: false,
        isLoading: false,
        data: privateWelfareResponse,
        isEmpty: false,
      })
    })
    it('should handle PRIVATE_WELFARE_FAILURE', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_FAILURE,
        })
      ).toEqual({
        ...INITIAL_STATE,
        data: null,
        hasError: true,
        isLoading: false,
        isEmpty: false,
      })
    })
    it('should handle PRIVATE_WELFARE_EMPTY', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_EMPTY,
        })
      ).toEqual({
        ...INITIAL_STATE,
        data: null,
        hasError: false,
        isLoading: false,
        isEmpty: true,
      })
    })
  })
  describe('PrivateWelfareWithStatusPRE state', () => {
    it('should return INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })
    it('should handle PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST,
        })
      ).toEqual({
        ...INITIAL_STATE,
        hasErrorStatusPRE: false,
        isLoadingStatusPRE: true,
      })
    })
    it('should handle PRIVATE_WELFARE_WITH_STATUS_PRE_SUCCESS', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_SUCCESS,
          payload: privateWelfateWithStatusPREResponse,
        })
      ).toEqual({
        ...INITIAL_STATE,
        dataStatusPRE: privateWelfateWithStatusPREResponse,
        isLoadingStatusPRE: false,
      })
    })
    it('should handle PRIVATE_WELFARE_WITH_STATUS_PRE_FAILURE', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_FAILURE,
        })
      ).toEqual({
        ...INITIAL_STATE,
        isLoadingStatusPRE: false,
        hasErrorStatusPRE: true,
      })
    })
  })
})
