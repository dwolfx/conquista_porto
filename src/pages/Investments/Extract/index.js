import React, { useState, useEffect, useReducer, useContext } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'
import DateInput from 'components/Inputs/DateInput'
import Select from 'components/Inputs/Select'
import Table from 'components/Table'
import Header from 'components/Wizard/Header'
import Tab from 'components/Tab'
import { formatCpf } from 'helpers'

import useExtract from './data'
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
  const [bankInfo, setBankInfo] = useState(null)
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [stateTab, setCurrentTab] = useReducer(reducerstateTab, {
    accumulatorClass: '',
    statementClass: 'active',
  })

  const bankData = useSelector(state => state.bankData.data)
  const [statementColumns, statementData, selectOptions] = useExtract()

  useEffect(() => {
    if (bankData.length > 0) {
      setBankInfo({ ...bankData[0].dadosContaPortoSeguro })
    }
  }, [bankData])

  const handleChangeSelect = e => {
    setShowDateFilter(e.target.value === 'other')
  }

  return (
    <>
      <Header showBackButton={false} />

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
                <InfosData>{bankInfo && bankInfo.codigo_banco}</InfosData>
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
                <InfosData>{bankInfo && bankInfo.agencia}</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="wallet" />
              <InfosWrapper>
                <InfosLabel>Conta</InfosLabel>
                <InfosData>
                  {bankInfo && `${bankInfo.conta}-${bankInfo.digito_conta}`}
                </InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={themeContext.colors.blue4} width={40} name="boy" />
              <InfosWrapper>
                <InfosLabel>Favorecido</InfosLabel>
                <InfosData>{bankInfo && bankInfo.titular}</InfosData>
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
                <InfosData>{bankInfo && formatCpf(bankInfo.cpf)}</InfosData>
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
              />
              {showDateFilter && (
                <>
                  <DateInput
                    width={30}
                    label="Data inicial"
                    paddingRight={15}
                    paddingLeft={15}
                  />
                  <DateInput
                    width={30}
                    label="Data final"
                    paddingRight={15}
                    paddingLeft={15}
                  />
                  <FilterButton>Filtrar &gt;</FilterButton>
                </>
              )}
            </SelectWrapper>
          )}
          <Table columns={statementColumns} data={statementData} />
        </Container>
      </Section>
    </>
  )
}

export default InvestmentExtract
