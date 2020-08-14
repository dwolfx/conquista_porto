import { all, takeLatest, call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'

import { getData } from './sagas'
import { GetBankExtractFundFailure, GetBankExtractFundSuccess } from './action'

describe('BankExtractFund Sagas', () => {
  describe('getData', () => {
    it('getData: success triggers success action', () => {
      const param = {
        type: 'TESTE',
        payload: ['url_teste'],
      }
      const generator = getData(param)
      const response = { data: {} }

      expect(generator.next(response).value).toEqual(
        call(get, `${baseURLNamespaceInvest}/fundos/movimentacoes?0=url_teste`)
      )

      expect(generator.next(response).value).toEqual(
        put(GetBankExtractFundSuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getData: fail triggers fail action', () => {
      const param = {
        type: 'TESTE',
        payload: undefined,
      }
      const generator = getData(param)
      const response = { data: {} }

      expect(generator.next(response).value).toEqual(
        put({
          ...GetBankExtractFundFailure(),
          toast: {
            message: "Cannot convert undefined or null to object",
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
