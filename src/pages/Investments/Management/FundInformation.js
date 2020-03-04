import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'
import DropDown from 'components/DropdownNew'
import TopicsIconContent from 'components/TopicsIconContent'

import { formatMoney } from 'helpers'

import { months } from './data'
import {
  PageTitle,
  Topic,
  TopicTitle,
  TopicValue,
  BalanceAccordion,
  HeaderNodeBalanceAccordion,
  CurrentBalance,
  GrossIncome,
  Text,
  RowBankTransition,
  BankTransitionDateWrapper,
  SelectBox,
  SelectItem,
  SelectIcon,
} from './styles'

export default function FundInformation({ fund }) {
  const theme = useContext(ThemeContext)

  const [incomeValue, setIncomeValue] = useState(null)
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    setIncomeValue(fund.rendimentos.rendimento[months[0].value].valorrendimento)
  }, [fund])

  const handleSelectChange = item => {
    setSelectValue(item.name)
    setIncomeValue(
      fund.rendimentos.rendimento[months[item.value].value].valorrendimento
    )
  }

  function renderSelectItems(closeFunc) {
    const handleClick = item => {
      handleSelectChange(item)
      closeFunc()
    }

    const nodes = months.map(item => (
      <SelectItem key={item.name} onClick={() => handleClick(item)}>
        {item.name}
      </SelectItem>
    ))

    return nodes
  }

  return (
    <>
      <PageTitle>{fund.fundo.apelido}</PageTitle>
      <div>
        <TopicsIconContent>
          <Topic>
            <Icon width="28" fill={theme.colors.blue4} name="time" />
            <div>
              <TopicTitle>perfil de risco</TopicTitle>
              <TopicValue>{fund.fundo.perfil_risco}</TopicValue>
            </div>
          </Topic>
          <Topic>
            <Icon width="28" fill={theme.colors.blue4} name="coin" />
            <div>
              <TopicTitle>Movimentações Mín.</TopicTitle>
              <TopicValue>{formatMoney(fund.fundo.aplicao_minima)}</TopicValue>
            </div>
          </Topic>
          <Topic>
            <Icon
              width="28"
              fill={theme.colors.blue4}
              name="monitoranalytics"
            />
            <div>
              <TopicTitle>Cotização/liquidação</TopicTitle>
              <TopicValue>{`${fund.fundo.aplicacao_cotizacao} ${fund.fundo.contagem_dias_resgate}`}</TopicValue>
            </div>
          </Topic>
        </TopicsIconContent>
        <BalanceAccordion
          isOrangeArrow
          titleNode={
            <HeaderNodeBalanceAccordion>
              <Text>Saldo Bruto atual</Text>
              <Text>{formatMoney(fund.saldo_atual)}</Text>
              <Text>{moment().format('DD/MM/YYYY')}</Text>
            </HeaderNodeBalanceAccordion>
          }
          gtmName="saldo bruto atual"
        >
          <CurrentBalance>
            <RowBankTransition>
              <BankTransitionDateWrapper>
                <Icon name="add" fill={theme.colors.green3} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  Saldo bruto
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="4px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  Saldo bloqueado
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition
              marginTop="4px"
              borderTop={`1px solid ${theme.colors.gray3}`}
            >
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                Saldo disponível
              </Text>
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="14px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  IR*
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="4px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  IOF*
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition
              marginTop="4px"
              borderTop={`1px solid ${theme.colors.gray3}`}
            >
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                Saldo líquido
              </Text>
              <Text fontSize="16px" lineHeight="24px" fontWeight="bold">
                --
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="14px">
              <Text
                fontSize="15px"
                lineHeight="25px"
                fontWeight="bold"
                fontColor={theme.colors.blue4}
              >
                Movimentações pendentes
              </Text>
              <Text fontSize="16px" lineHeight="28px" fontWeight="300">
                --
              </Text>
            </RowBankTransition>
            <Text
              fontSize="12px"
              lineHeight="1.3"
              fontColor={theme.colors.gray5}
            >
              O saldo refere-se ao valor na data de 01/03/2019 e será atualizado
              no decorrer do dia. Resgastes realizados estarão sujeitos à
              confirmação.
              <br />
              <br />* Valores estimados
            </Text>
          </CurrentBalance>
        </BalanceAccordion>
        <GrossIncome>
          <Text>Rendimento Bruto</Text>
          <Text>{formatMoney(incomeValue)}</Text>
          <DropDown
            nodes={[renderSelectItems]}
            customWidth="auto"
            containerPadding="0px"
          >
            <SelectBox>
              {selectValue || 'Selecione'}
              <SelectIcon name="arrowdown" color="white" />
            </SelectBox>
          </DropDown>
        </GrossIncome>
      </div>
    </>
  )
}

FundInformation.propTypes = {
  fund: PropTypes.shape({
    rendimentos: PropTypes.shape({
      rendimento: PropTypes.array,
    }),
    fundo: PropTypes.shape({
      aplicacao_cotizacao: PropTypes.string,
      apelido: PropTypes.string,
      perfil_risco: PropTypes.string,
      aplicao_minima: PropTypes.string,
      contagem_dias_resgate: PropTypes.string,
    }),
    saldo_atual: PropTypes.string,
  }).isRequired,
}
