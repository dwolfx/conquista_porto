/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'
import DateInput from 'components/Inputs/DateInput'
import Select from 'components/Inputs/Select'
import Table from 'components/Table'
import Header from 'components/Wizard/Header'
import Tab from 'components/Tab'
import { formatMoney, formatCpf } from 'helpers'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

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

const InvestmentExtract = () => {
  const themeContext = useContext(ThemeContext)
  const history = useHistory()
  const dispatch = useDispatch()

  const [showDateFilter, setShowDateFilter] = useState(false)

  const [requestData, setRequestData] = useState({
    filter: 0,
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    dispatch(GetBankExtractRequest(requestData))
  }, [])

  useFetchBankData()

  const bankData = useSelector(state => state.bankData.data)
  const bankExtract = useSelector(state => {
    // formating bankExtract to build table data (must be an array)
    // if no data exists, return an empty array
    try {
      return Array.isArray(state.bankExtract.data.transacoes.transacao)
        ? state.bankExtract.data.transacoes.transacao.map(item => ({
            transactionDate: moment(item.data).format('DD/MM/YYYY'),
            type: item.tipo,
            value: formatMoney(Math.abs(item.valor)),
          }))
        : [
            {
              transactionDate: moment(
                state.bankExtract.data.transacoes.transacao.data
              ).format('DD/MM/YYYY'),
              type: state.bankExtract.data.transacoes.transacao.tipo,
              value: formatMoney(
                Math.abs(state.bankExtract.data.transacoes.transacao.valor)
              ),
            },
          ]
    } catch {
      return []
    }
  })

  const handleChangeSelect = e => {
    setShowDateFilter(e.target.value === 'other')

    if (e.target.value !== 'other') {
      setRequestData({
        ...requestData,
        filter: e.target.value,
        startDate: '',
        endDate: '',
      })

      dispatch(GetBankExtractRequest(requestData))
    }
  }

  const filterByDate = () => {
    dispatch(GetBankExtractRequest(requestData))
  }

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
                  {bankData.DadosContaPortoSeguro &&
                    bankData.DadosContaPortoSeguro.codigo_banco}
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
                  {bankData.DadosContaPortoSeguro &&
                    bankData.DadosContaPortoSeguro.agencia}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="wallet" />
              <InfosWrapper>
                <InfosLabel>Conta</InfosLabel>
                <InfosData>
                  {bankData.DadosContaPortoSeguro &&
                    `${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="boy" />
              <InfosWrapper>
                <InfosLabel>Favorecido</InfosLabel>
                <InfosData>
                  {bankData.DadosContaPortoSeguro &&
                    bankData.DadosContaPortoSeguro.titular}
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
                  {bankData.DadosContaPortoSeguro &&
                    formatCpf(bankData.DadosContaPortoSeguro.cpf)}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
          </Row>
        </Container>
      </Section>
      <Section backgroundColor={themeContext.colors.gray1}>
        <Container backgroundColor={themeContext.colors.gray1}>
          <TableTabs>
            <Tab className="active">Extrato</Tab>
          </TableTabs>
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
                    const startDate = moment(
                      e.target.value,
                      'DD/MM/YYYY'
                    ).isValid()
                      ? moment(e.target.value, 'DD/MM/YYYY').format(
                          'YYYY-MM-DD'
                        )
                      : ''

                    setRequestData({
                      ...requestData,
                      startDate,
                    })
                  }}
                />
                <DateInput
                  width={30}
                  label="Data final"
                  paddingRight={15}
                  paddingLeft={15}
                  onBlur={e => {
                    const endDate = moment(
                      e.target.value,
                      'DD/MM/YYYY'
                    ).isValid()
                      ? moment(e.target.value, 'DD/MM/YYYY').format(
                          'YYYY-MM-DD'
                        )
                      : ''

                    setRequestData({
                      ...requestData,
                      endDate,
                    })
                  }}
                />
                <FilterButton onClick={() => filterByDate()}>
                  Filtrar &gt;
                </FilterButton>
              </>
            )}
          </SelectWrapper>
          <Table
            columns={statementColumns}
            data={bankExtract}
            showFilter={false}
          />
        </Container>
      </Section>
    </>
  )
}

export default InvestmentExtract
