import React, { useState, useEffect, createRef } from 'react'
import moment from 'moment'

import ButtonTag from 'components/Button/Tag'

import { ISuggestionValues } from 'pages/Objectives/GoalStreams/types'
import * as s from '../styles'
import { useSelector } from 'react-redux'

interface IProps {
  options: ISuggestionValues[]
  type?: string
  onClick?: (e: any) => void
}

const SuggestionTag = React.forwardRef<HTMLInputElement, IProps>(
  ({ options, type, onClick }, ref) => {
    const { current: innerRef } = (ref || createRef()) as React.RefObject<
      HTMLInputElement
    >

    const [currentSelectedValue, setCurrentSelectedValue] = useState<
      string | undefined
    >('')

    const customerData = useSelector<any, any>(
      state => state.customerProfile.data
    )

    const customerAge = moment().diff(customerData.customerBirthdate, 'years')
    const refValue = innerRef?.value

    useEffect(() => {
      setCurrentSelectedValue(refValue)
    }, [refValue])

    return (
      <s.SuggestionTagContainer>
        {options
          ? options.map(({ label, value }) => {
              let innerValue = value

              // if label has CONST ({{{}}}) and + signal, it is meant for an math operation
              // {{{AGE}}} it is replaced by the customerAge
              const labelToDisplay =
                label.indexOf('+') > -1
                  ? `${+label
                      .split('+')[0]
                      .replace('{{{AGE}}}', customerAge.toString()) +
                      +label.split('+')[1]} anos`
                  : label

              if (type === 'date' && typeof value === 'object') {
                const { amount, duration } = value

                innerValue = moment()
                  .add(amount, duration)
                  .format('DD/MM/YYYY')

                if (amount >= 100) {
                  return null
                }
              }

              return (
                <ButtonTag
                  key={`suggestion-${label}`}
                  type="button"
                  color={currentSelectedValue === innerValue ? 'primary' : ''}
                  onClick={() => {
                    innerRef!.value = innerValue.toString()

                    onClick!({
                      target: { name: innerRef!.name, value: innerRef!.value },
                    })

                    innerRef && innerRef.focus()
                  }}
                >
                  {labelToDisplay}
                </ButtonTag>
              )
            })
          : null}
      </s.SuggestionTagContainer>
    )
  }
)

export default SuggestionTag
