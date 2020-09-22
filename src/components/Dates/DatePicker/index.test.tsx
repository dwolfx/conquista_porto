import React from 'react'
import moment from 'moment'
import { renderWithReduxAndTheme } from 'testUtils'

import DatePicker from '.'

describe('DatePicker', () => {
  it('Should render input', () => {
    const { getByPlaceholderText } = renderWithReduxAndTheme(
      <DatePicker
        dateItem={moment()}
        focusedInput={false}
        onHandleFocusedInput={() => {}}
        onHandleSetDateItem={() => {}}
      />
    )
    expect(getByPlaceholderText('Data')).toBeDefined()
  })

  it('Should render open calendar', () => {
    const { getByText } = renderWithReduxAndTheme(
      <DatePicker
        dateItem={moment()}
        focusedInput={true}
        onHandleFocusedInput={() => {}}
        onHandleSetDateItem={() => {}}
      />
    )
    expect(getByText('Sun')).toBeDefined()
    expect(getByText('Mon')).toBeDefined()
    expect(getByText('Tue')).toBeDefined()
    expect(getByText('Wed')).toBeDefined()
    expect(getByText('Thu')).toBeDefined()
    expect(getByText('Fri')).toBeDefined()
    expect(getByText('Sat')).toBeDefined()
  })
})
