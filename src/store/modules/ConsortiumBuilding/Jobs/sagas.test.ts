import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import consortiumBuildingJobsMock from 'mocks/consortiumBuildingJobs.json'

import { getJobs } from './sagas'
import { GetJobsSuccess, GetJobsFailure } from './action'

describe('Consortium Building Jobs Sagas', () => {
  it('success triggers success action', () => {
    const generator = getJobs()
    const response = { data: consortiumBuildingJobsMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/profissoes`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetJobsSuccess({
          ...response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getJobs()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/profissoes`)
    )
    expect(generator.next(response).value).toEqual(put(GetJobsFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
