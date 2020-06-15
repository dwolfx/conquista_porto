import React, { useState, useEffect } from 'react'

import { dict } from 'components/IconExporter'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'
import DateInput from 'components/Inputs/DateInput'
import MoneyInput from 'components/Inputs/Money'

import { IData } from 'pages/Objectives/GoalStreams/types'

import OutterWrapper from './OutterWrapper'

interface IProps extends IData {
  formData: any
  onChangeFormData: (event: any) => void
  options?: {
    name: string
    value: string | number
  }[]
  error:
    | {
        icon: keyof typeof dict
        message: string
      }
    | boolean
    | null
  button?: React.ReactNode
  category?: string | undefined
  valueNickname: boolean
}

const QuestionInput = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      formData,
      name,
      onChangeFormData,
      options,
      type,
      error,
      placeholder = '',
      category,
      valueNickname,
      ...rest
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper
          formData={formData}
          onTagClick={onChangeFormData}
          ref={ref}
          type={type}
          {...rest}
        >
          <DateInput
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={(e: any) => {
              onChangeFormData(e)
            }}
            value={formData[name]}
            error={error || false}
            newInput
            placeholder="dd/mm/aaaa"
          />
        </OutterWrapper>
      )
    }
    if (type === 'bool') {
      return (
        <OutterWrapper formData={formData} ref={ref} type={type} {...rest}>
          <RadioInput
            name={name}
            onChange={onChangeFormData}
            options={options}
            checkedItem={formData[name]}
            itemsDirection={
              name === 'is_easy_to_save_planned_amount' ? 'column' : 'row'
            }
          />
        </OutterWrapper>
      )
    }
    if (type === 'number') {
      return (
        <OutterWrapper formData={formData} ref={ref} type={type} {...rest}>
          <MoneyInput
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error || false}
            maxLength={14}
            placeholder={placeholder}
          />
        </OutterWrapper>
      )
    }

    const [inputCounter, setInputCounter] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputCounter(e.target.value.length)

      onChangeFormData(e)
    }

    useEffect(() => {
      if (valueNickname)
        setInputCounter(formData[name].length || category?.length)
    }, [category, formData, name, valueNickname])

    return (
      <OutterWrapper formData={formData} ref={ref} type={type} {...rest}>
        <InputText
          data-gtm-form="input"
          data-gtm-name={name}
          ref={ref}
          name={name}
          onChange={handleChange}
          suffix={<>{inputCounter}/20</>}
          value={formData[name]}
          error={error || false}
          maxLength={20}
          placeholder={category}
        />
      </OutterWrapper>
    )
  }
)

export default QuestionInput
