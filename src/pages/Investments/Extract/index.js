import React, { useState, useEffect, useReducer, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'
import DateInput from 'components/Inputs/DateInput'
import Select from 'components/Inputs/Select'
import Table from 'components/Table'
import Header from 'components/Wizard/Header'
import Tab from 'components/Tab'
import { formatMoney, formatCpf } from 'helpers'
import useFetchBankExtract from 'hooks/BankExtract/useFetchBankExtract'

import { selectOptions, statementColumns } from './data'
import {
  Section,
  Container,
  SectionTitle,
  SectionSubTitle,
  Row,
  AccountInfoWrapper,
  InfosWrapper,
  InfosLabel,
  InfosData,
  TableTabs,
  SelectWrapper,
  FilterButton,
} from './styles'

const reducerstateTab = (stateInner, activeKey) =>
  Object.keys(stateInner).reduce(
    (cur, key) => ({
      ...cur,
      [key]: key === activeKey ? 'active' : '',
    }),
    {}
  )

const InvestmentExtract = () => {
  const themeContext = useContext(ThemeContext)
  const history = useHistory()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [requestData, setRequestData] = useState({
    filter: 0,
    startDate: '',
    endDate: '',
  })
  const [extractData, setExtractData] = useState([])
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [stateTab, setCurrentTab] = useReducer(reducerstateTab, {
    accumulatorClass: '',
    statementClass: 'active',
  })

  useFetchBankExtract(requestData)

  const bankExtract = useSelector(state => state.bankExtract.data)

  const handleChangeSelect = e => {
    setShowDateFilter(e.target.value === 'other')

    if (e.target.value !== 'other') {
      setRequestData({
        ...requestData,
        filter: e.target.value,
      })
    }
  }

  const filterByDate = () => {
    setRequestData({
      ...requestData,
      filter: 0,
      startDate,
      endDate,
    })
  }

  useEffect(() => {
    if (bankExtract.transacoes && bankExtract.transacoes.transacao) {
      const newExtract = bankExtract.transacoes.transacao.map(item => ({
        transactionDate: moment(item.data).format('DD/MM/YYYY'),
        type: item.tipo,
        value: formatMoney(Math.abs(item.valor)),
        effectuationDate: moment(item.data).format('DD/MM/YYYY'),
      }))

      setExtractData(newExtract)
    } else {
      setExtractData([])
    }
  }, [bankExtract])

  return (
    <>
      <Header
        showBackButton={false}
        onClose={() => {
          history.goBack()
        }}
      />

      <Section>
        <Container>
          <SectionTitle>Extrato de movimentações</SectionTitle>
        </Container>
      </Section>

      <Section>
        <Container>
          <Row justify="center">
            <SectionSubTitle>Conta de investimentos</SectionSubTitle>
          </Row>
          <Row justify="space-around">
            <AccountInfoWrapper>
              <Icon
                fill={themeContext.colors.blue4}
                width={40}
                name="building"
              />
              <InfosWrapper>
                <InfosLabel>Banco</InfosLabel>
                <InfosData>
                  {bankExtract.conta && bankExtract.conta.codigo_banco}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon
                fill={themeContext.colors.blue4}
                width={40}
                name="barcode"
              />
              <InfosWrapper>
                <InfosLabel>Agência</InfosLabel>
                <InfosData>
                  {bankExtract.conta && bankExtract.conta.agencia}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="wallet" />
              <InfosWrapper>
                <InfosLabel>Conta</InfosLabel>
                <InfosData>
                  {bankExtract.conta &&
                    `${bankExtract.conta.conta}-${bankExtract.conta.digito_conta}`}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="boy" />
              <InfosWrapper>
                <InfosLabel>Favorecido</InfosLabel>
                <InfosData>
                  {bankExtract.conta && bankExtract.conta.titular}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon
                fill={themeContext.colors.blue4}
                width={40}
                name="fingerprint"
              />
              <InfosWrapper>
                <InfosLabel>CPF</InfosLabel>
                <InfosData>
                  {bankExtract.conta && formatCpf(bankExtract.conta.cpf)}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
          </Row>
        </Container>
      </Section>
      <Section backgroundColor={themeContext.colors.gray1}>
        <Container backgroundColor={themeContext.colors.gray1}>
          <TableTabs>
            <Tab
              onClick={() => setCurrentTab('statementClass')}
              className={stateTab.statementClass}
            >
              Extrato
            </Tab>
            <Tab
              onClick={() => setCurrentTab('accumulatorClass')}
              className={stateTab.accumulatorClass}
            >
              Lançamentos futuros
            </Tab>
          </TableTabs>
          {stateTab.statementClass === 'active' && (
            <SelectWrapper>
              <Select
                width={30}
                paddingRight={15}
                label="Filtrar por período"
                options={selectOptions}
                onChange={handleChangeSelect}
                defaultValue={0}
              />
              {showDateFilter && (
                <>
                  <DateInput
                    width={30}
                    label="Data inicial"
                    paddingRight={15}
                    paddingLeft={15}
                    onBlur={e => {
                      setStartDate(
                        moment(e.target.value, 'DD/MM/YYYY').format(
                          'YYYY-MM-DD'
                        )
                      )
                    }}
                  />
                  <DateInput
                    width={30}
                    label="Data final"
                    paddingRight={15}
                    paddingLeft={15}
                    onBlur={e => {
                      setEndDate(
                        moment(e.target.value, 'DD/MM/YYYY').format(
                          'YYYY-MM-DD'
                        )
                      )
                    }}
                  />
                  <FilterButton onClick={() => filterByDate()}>
                    Filtrar &gt;
                  </FilterButton>
                </>
              )}
            </SelectWrapper>
          )}
          <Table
            columns={statementColumns}
            data={extractData}
            renderFilter={false}
          />
        </Container>
      </Section>
    </>
  )
}

export default InvestmentExtract
