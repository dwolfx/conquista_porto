import React, { useState, useReducer } from 'react'

import Icon from 'components/IconExporter'
import DateInput from 'components/Inputs/DateInput'
import Select from 'components/Inputs/Select'
import Table from 'components/Table'
import Header from 'components/Wizard/Header'
import theme from 'styles/theme'

import { statementColumns, statementData, selectOptions } from './mocks'
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
  TableTab,
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
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [stateTab, setCurrentTab] = useReducer(reducerstateTab, {
    accumulatorClass: '',
    statementClass: 'active',
  })

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
                fill={theme.colors.primary.light}
                width={40}
                name="building"
              />
              <InfosWrapper>
                <InfosLabel>Banco</InfosLabel>
                <InfosData>306</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon
                fill={theme.colors.primary.light}
                width={40}
                name="barcode"
              />
              <InfosWrapper>
                <InfosLabel>Agência</InfosLabel>
                <InfosData>0001</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon
                fill={theme.colors.primary.light}
                width={40}
                name="wallet"
              />
              <InfosWrapper>
                <InfosLabel>Conta</InfosLabel>
                <InfosData>999999-6</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon fill={theme.colors.primary.light} width={40} name="boy" />
              <InfosWrapper>
                <InfosLabel>Favorecido</InfosLabel>
                <InfosData>Julia Francis Reys</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
            <AccountInfoWrapper>
              <Icon
                fill={theme.colors.primary.light}
                width={40}
                name="fingerprint"
              />
              <InfosWrapper>
                <InfosLabel>CPF</InfosLabel>
                <InfosData>000.000.000-00</InfosData>
              </InfosWrapper>
            </AccountInfoWrapper>
          </Row>
        </Container>
      </Section>
      <Section backgroundColor={theme.colors.backgroundColor}>
        <Container backgroundColor={theme.colors.backgroundColor}>
          <TableTabs>
            <TableTab
              onClick={() => setCurrentTab('statementClass')}
              className={stateTab.statementClass}
            >
              Extrato
            </TableTab>
            <TableTab
              onClick={() => setCurrentTab('accumulatorClass')}
              className={stateTab.accumulatorClass}
            >
              Lançamentos futuros
            </TableTab>
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
