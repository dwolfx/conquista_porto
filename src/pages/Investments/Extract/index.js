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
import {
  GetBankExtractRequest,
  ClearBankExtractData,
} from 'store/modules/BankExtract/action'
import {
  GetBankExtractFundRequest,
  ClearBankExtractFundData,
} from 'store/modules/BankExtractFund/action'
import useQueryParams from 'hooks/useQueryParams'

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
  const auth = useSelector(state => state.auth)
  const query = useQueryParams()

  const [showDateFilter, setShowDateFilter] = useState(false)

  const [requestData, setRequestData] = useState({
    idFundo: query.get('idFundo'),
    tipoFiltro: 30,
    dataInicial: '',
    dataFinal: '',
  })

  useEffect(() => {
    if (query.get('idFundo')) {
      dispatch(GetBankExtractFundRequest(requestData, auth.cpf))
    } else {
      dispatch(GetBankExtractRequest(requestData, auth.cpf))
    }
  }, [])

  useFetchBankData()
  const bankData = useSelector(state => state.bankData.data)
  const bankExtract = useSelector(state => {
    if (query.get('idFundo')) {
      return state.bankExtractFund
    }
    return state.bankExtract
  })

  const handleChangeSelect = e => {
    setShowDateFilter(e.target.value === 'other')
    if (e.target.value !== 'other') {
      const newRequestData = {
        ...requestData,
        tipoFiltro: e.target.value,
        dataInicial: '',
        dataFinal: '',
      }
      setRequestData(newRequestData)

      if (query.get('idFundo')) {
        dispatch(GetBankExtractFundRequest(newRequestData, auth.cpf))
      } else {
        dispatch(GetBankExtractRequest(newRequestData, auth.cpf))
      }
    } else {
      setRequestData({
        ...requestData,
        tipoFiltro: 0,
      })
    }
  }

  const normalizePayload = extract => {
    let bankExtractNormalized = []

    if (extract.data.transacoes && extract.data.transacoes.transacao) {
      bankExtractNormalized = Array.isArray(extract.data.transacoes.transacao)
        ? extract.data.transacoes.transacao.map(item => ({
            transactionDate: moment(item.data).format('DD/MM/YYYY'),
            type: item.tipo,
            value: formatMoney(Math.abs(item.valor)),
          }))
        : [
            {
              transactionDate: moment(
                extract.data.transacoes.transacao.data
              ).format('DD/MM/YYYY'),
              type: extract.data.transacoes.transacao.tipo,
              value: formatMoney(
                Math.abs(extract.data.transacoes.transacao.valor)
              ),
            },
          ]
    }
    if (extract.data[0] && extract.data[0].operacoes) {
      const { operacoes } = extract.data[0]
      bankExtractNormalized = Array.isArray(operacoes.operacao)
        ? operacoes.operacao.map(operacaoItem => ({
            transactionDate: moment(operacaoItem.data_operacao).format(
              'DD/MM/YYYY'
            ),
            type: operacaoItem.tipo_operacao,
            value: formatMoney(Math.abs(operacaoItem.valor_bruto)),
          }))
        : [
            {
              transactionDate: moment(operacoes.operacao.data_operacao).format(
                'DD/MM/YYYY'
              ),
              type: operacoes.operacao.tipo_operacao,
              value: formatMoney(Math.abs(operacoes.operacao.valor_bruto)),
            },
          ]
    }
    return bankExtractNormalized
  }
  const filterByDate = () => {
    const newRequestData = {
      ...requestData,
      dataInicial: moment(requestData.dataInicial).format('YYYY-MM-DD'),
      dataFinal: moment(requestData.dataFinal).format('YYYY-MM-DD'),
    }
    if (query.get('idFundo')) {
      dispatch(GetBankExtractFundRequest(newRequestData, auth.cpf))
    } else {
      dispatch(GetBankExtractRequest(newRequestData, auth.cpf))
    }
  }

  const validateDate = field => {
    if (!moment(requestData[field], 'DD/MM/YYYY').isValid()) {
      setRequestData({
        ...requestData,
        [field]: '',
      })
    }
  }

  const handleDateInput = (e, field) => {
    setRequestData({
      ...requestData,
      [field]: e.target.value,
    })
  }

  if (!bankData) {
    return <div></div>
  }

  return (
    <>
      <Header
        showBackButton={false}
        onClose={() => {
          if (query.get('idFundo')) {
            dispatch(ClearBankExtractFundData())
          } else {
            dispatch(ClearBankExtractData())
          }
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
          {bankData && (
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
                <Icon
                  fill={themeContext.colors.blue4}
                  width={40}
                  name="wallet"
                />
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
          )}
        </Container>
      </Section>
      <Section backgroundColor={themeContext.colors.gray1}>
        <Container backgroundColor={themeContext.colors.gray1}>
          <TableTabs>
            <Tab
              data-gtm-type="click"
              data-gtm-clicktype="menu"
              data-gtm-name="extrato"
              className="active"
            >
              Extrato
            </Tab>
          </TableTabs>
          <SelectWrapper>
            <Select
              width={30}
              paddingRight={15}
              label="Filtrar por período"
              options={selectOptions}
              onChange={handleChangeSelect}
              defaultValue={30}
              selectTitle="filtrar por periodo"
            />
            {showDateFilter && (
              <>
                <DateInput
                  width={30}
                  label="Data inicial"
                  paddingRight={15}
                  paddingLeft={15}
                  onChange={e => handleDateInput(e, 'dataInicial')}
                  onBlur={() => validateDate('dataInicial')}
                  value={requestData.dataInicial}
                />
                <DateInput
                  data-gtm-form="input"
                  data-gtm-name="data final"
                  width={30}
                  label="Data final"
                  paddingRight={15}
                  paddingLeft={15}
                  value={requestData.dataFinal}
                  onChange={e => handleDateInput(e, 'dataFinal')}
                  onBlur={() => validateDate('dataFinal')}
                />
                <FilterButton
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  data-gtm-subname="extrato"
                  data-gtm-name="filtrar"
                  onClick={() => filterByDate()}
                >
                  Filtrar &gt;
                </FilterButton>
              </>
            )}
          </SelectWrapper>
          <Table
            columns={statementColumns}
            data={normalizePayload(bankExtract)}
            showFilter={false}
          />
        </Container>
      </Section>
    </>
  )
}

export default InvestmentExtract
