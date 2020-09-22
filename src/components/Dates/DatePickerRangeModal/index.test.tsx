import React from 'react'
import moment from 'moment'
import { renderWithReduxAndTheme } from 'testUtils'

import DatePickerRangeModal from '.'

describe('DatePickerRangeModal', () => {
  it('Should render the DatePickerRangerModal', () => {
    let portalRoot = document.getElementById('root')

    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const { getAllByRole } = renderWithReduxAndTheme(
      <DatePickerRangeModal
        isOpen={false}
        onChangeModalOpen={() => {}}
        onHandleApply={() => {}}
      />,
      { container: portalRoot }
    )
    expect(getAllByRole('presentation')).toBeDefined()
  })
  it('Should render the DatePickerRangerModal mobile', () => {
    window.resizeTo(320, 568)

    let portalRoot = document.getElementById('root')

    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const { getAllByRole } = renderWithReduxAndTheme(
      <DatePickerRangeModal
        isOpen={true}
        onChangeModalOpen={() => {}}
        onHandleApply={() => {}}
      />,
      { container: portalRoot }
    )
    expect(getAllByRole('presentation')).toBeDefined()
  })

  it('Should render the DatePickerRangerModal with preselected dates', () => {
    window.resizeTo(320, 568)

    let portalRoot = document.getElementById('root')

    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const headerControlls = <div>Test</div>

    const { getByText } = renderWithReduxAndTheme(
      <DatePickerRangeModal
        isOpen={false}
        headerControlls={headerControlls}
        preSelectedRange={{
          dateBegin: moment(),
          dateEnd: moment(),
        }}
        onChangeModalOpen={() => {}}
        onHandleApply={() => {}}
      />,
      { container: portalRoot }
    )
    expect(getByText('Test')).toBeDefined()
  })

  it('Should render the DatePickerRangerModal without "inputfocus" ', () => {
    window.resizeTo(320, 568)

    let portalRoot = document.getElementById('root')

    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const headerControlls = <div>Test</div>

    const { getByText } = renderWithReduxAndTheme(
      <DatePickerRangeModal
        isOpen={true}
        headerControlls={headerControlls}
        onChangeModalOpen={() => {}}
        onHandleApply={() => {}}
      />,
      { container: portalRoot }
    )
    expect(getByText('Test')).toBeDefined()
  })
})
