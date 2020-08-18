import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import ObjectiveListContent from '../../../pages/Home/ObjectiveListContent'

const INITIAL_STATE = {
  auth: {
    cpf: '11111111111',
  },
  objectives: [
    {
      id: 1,
      nickname: '23',
      total_balance: 123,
      target_value: 234,
      percentage: 123,
      remaining_value: 123,
      hasError: false,
      isLoadingList: false,
    },
  ],
  objectiveManagement: [],
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('ObjectiveListContent', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ObjectiveListContent objectives={INITIAL_STATE.objectives} />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
