import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import {
  Text,
  RowBankTransition,
  BankTransitionDateWrapper,
  CompleteExtract,
  Section,
} from './styles'

export default function LastTransactions({ lastOperations }) {
  const theme = useContext(ThemeContext)
  const history = useHistory()
  const [operation] = lastOperations
  const renderLastTransactions = () =>
    lastOperations
      ? [lastOperations]
          .flatMap(item => item)
          .map(item => {
            const colorIcon =
              item.valor_bruto > 0 ? theme.colors.green3 : theme.colors.magenta2
            const typeIcon = item.valor_bruto > 0 ? 'add' : 'remove'

            return (
              <RowBankTransition
                width="310px"
                marginTop="22px"
                key={item.id_operacao}
              >
                <BankTransitionDateWrapper>
                  <Icon name={typeIcon} fill={colorIcon} width="14px" />
                  <Text
                    fontSize="12px"
                    lineHeight="22px"
                    fontWeight="300"
                    margin="0 0 0 6px"
                  >
                    {moment(item.data_operacao).format('DD/MM/YYYY')}
                  </Text>
                </BankTransitionDateWrapper>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  {item.tipo_operacao}
                </Text>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  {formatMoney(item.valor_bruto)}
                </Text>
              </RowBankTransition>
            )
          })
      : null

  return (
    <Section>
      <Text>Últimas Movimentações</Text>
      {renderLastTransactions()}
      <CompleteExtract
        data-gtm-type="click"
        data-gtm-clicktype="link"
        data-gtm-subname="ultimas movimentacoes"
        data-gtm-name="extrato completo"
        onClick={() => {
          history.push({
            pathname: '/investimentos/extrato',
            search: `?idFundo=${operation.id_fundo}`,
          })
        }}
      >
        Extrato Completo &gt;
      </CompleteExtract>
    </Section>
  )
}

LastTransactions.propTypes = {
  lastOperations: PropTypes.array.isRequired,
}
