import React from 'react'
import { INTERVAL_DATE_TYPE } from '../types'
import { renderWithReduxAndTheme } from 'testUtils'

import DatePickerRange from '.'

describe('DatePickerRange', () => {
  it('Should render initial and final input field', () => {
    const { getByPlaceholderText } = renderWithReduxAndTheme(
      <DatePickerRange
        numberOfMonths={2}
        idDatePickerRange="idDatePickerRange"
        rangeDates={{
          dateBegin: null,
          dateEnd: null,
          intervalDateType: INTERVAL_DATE_TYPE.MONTH,
        }}
        focusedInput="startDate"
        onHandleFocusedInput={() => {}}
        onHandleSetRangeDates={() => {}}
      />
    )
    expect(getByPlaceholderText('Data inicial')).toBeDefined()
    expect(getByPlaceholderText('Data final')).toBeDefined()
  })
})
