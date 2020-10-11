import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

import Text from 'components/Text'
import Dropdown from 'components/Dropdown'
import Icon from 'components/IconExporter'
import { IRangeMonthOption, IIncomes } from 'components/Dates/types'
import useMedia from 'hooks/useMedia'

import * as s from './styles'

interface IProps {
  options: IRangeMonthOption[]
}

const SelectRange: React.FC<IProps> = ({ options }) => {
  const [incomeValue, setIncomeValue] = useState<any | null>(null)
  const [selectValue, setSelectValue] = useState('Últimos 7 dias')

  const { incomeIsLoading, income } = useSelector((state: any) => ({
    incomeIsLoading: state.income.isLoading,
    income: state.income.data,
  }))

  const isVerticalTablet = useMedia('md')
  const themeContext = useContext(ThemeContext)

  const getMonth = (mes: number) => {
    let result = income.find((element: IIncomes) => element.meses === mes)
    return result || {}
  }

  useEffect(() => {
    if (!incomeIsLoading && income) {
      setIncomeValue(getMonth(options[0].value).rendimento)
      setSelectValue(options[0].name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income, incomeIsLoading])

  const handleSelectChange = (item: any) => {
    setSelectValue(item.name)
    setIncomeValue(getMonth(item.value).rendimento)
  }

  function renderSelectItems(closeFunc: Function) {
    const handleClick = (item: any) => {
      handleSelectChange(item)
      closeFunc()
    }

    const nodes = options.map(item => (
      <s.DropdownLineContent key={item.name} onClick={() => handleClick(item)}>
        <Text type="headline" bold color="gray6">
          {isVerticalTablet ? item.compactName : item.name}
        </Text>
      </s.DropdownLineContent>
    ))

    return nodes
  }

  return (
    <Dropdown
      nodes={[renderSelectItems]}
      title="Outros Objetivos"
      containerPadding="14px 0"
      customWidth={isVerticalTablet ? '102px' : '180px'}
      disabled={false}
      css={`
        width: 100%;
      `}
    >
      <s.ButtonContent>
        <div>
          <Text type="button" color="blue4">
            {selectValue}
          </Text>
        </div>
        <div className="icon">
          <Icon name="calendar" fill={themeContext.colors.blue4} width={21} />
        </div>
      </s.ButtonContent>
    </Dropdown>
  )
}

export default SelectRange
