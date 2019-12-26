import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import logoAnbima from 'assets/images/logo-anbima.png'
import useFetchInvestmentsDetails from 'hooks/Investments/useFetchInvestmentsDetails'
import useMedia from 'hooks/useMedia'

import { columns, riskClassification, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'
import {
  Section,
  TopWrapper,
  SelectRiskClassification,
  Breadcrumb,
  ContentWrapper,
  FooterWrapper,
  ImgAnbima,
  RiskDegree,
  SelectRow,
} from './styles'

const allOption = 'todos'

export default function FundsList() {
  useFetchInvestmentsDetails()

  const isMobile = useMedia('xs')
  const [selectedRisk, setSelectedRisk] = useState(allOption)
  const [selectedType, setSelectedType] = useState(allOption)
  const funds = useSelector(state => state.investmentsDetails)

  const filterFundsByType = type => fundsArr => {
    if (!fundsArr[0]) {
      return []
    }

    if (type !== allOption) {
      const fundFiltered = fundsArr[0].filter(
        fund => fund.nome_categoria.toLowerCase().replace(' ', '') === type
      )

      return fundFiltered[0] ? fundFiltered[0].fundos : []
    }

    return fundsArr[0].flatMap(fund => fund.fundos)
  }

  const filterFundsByRisk = risk => fundsArr => {
    if (!fundsArr) {
      return []
    }

    return risk === allOption
      ? fundsArr
      : fundsArr.filter(
          fund => parseInt(fund.perfil_risco_ordem, 10) === parseInt(risk, 10)
        )
  }

  const fundsMock = useMemo(() => {
    const filterByType = filterFundsByType(selectedType)
    const filterByRisk = filterFundsByRisk(selectedRisk)
    return filterByRisk(filterByType(funds.data))
  }, [funds.data, selectedRisk, selectedType])

  const columnsMock = useMemo(() => columns, [])

  return (
    <Section>
      <TopWrapper>
        <Breadcrumb crumbs={['SOLUÇÕES', 'INVESTIMENTOS', 'Lista de fundos']} />
        <SelectRow>
          <SelectRiskClassification
            width={40}
            label="Classificação de Risco"
            showPlaceholder={false}
            value={selectedRisk}
            options={riskClassification}
            onChange={event => {
              setSelectedRisk(event.target.value)
            }}
          />
          {isMobile && (
            <SelectRiskClassification
              width={40}
              label="Tipo"
              showPlaceholder={false}
              value={selectedType}
              options={fundsType}
              onChange={event => {
                setSelectedType(event.target.value)
              }}
            />
          )}
        </SelectRow>

        <RiskDegree actives={[1, 2, 3, 4, 5]} />
      </TopWrapper>
      <ContentWrapper>
        {isMobile ? (
          <ListFunds data={fundsMock} />
        ) : (
          <TableFunds
            columns={columnsMock}
            data={fundsMock}
            fundsType={fundsType}
            setSelectedType={setSelectedType}
            selectedType={selectedType}
          />
        )}
      </ContentWrapper>
      <FooterWrapper>
        <p>
          A Porto Seguro Investimentos informa os cotistas que o Distribuidor de
          cotas dos Fundos poderá receber remuneração de distribuição
          do(s)administrador(es) e/ou dos Fundos de Investimento em que seus
          clientes aplicarem recursos, seja na forma de investimento direto,
          seja por meio de conta e ordem; Esta remuneração poderá ser
          diferenciada em função dos diversos Fundos de Investimento investidos.
          Leia o formulário de informações complementares, a lâmina de
          informações essenciais, se houver, e o regulamento antes de investir.
          Confira a Lâmina de Informações Essenciais, o Demonstrativo de
          Desempenho e o Formulário de Informações Complementares - INTRAG/CVM.
          &nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.intrag.com.br/intrag-pt/index.html"
          >
            ACESSE AQUI
          </a>
          . A Porto Seguro Investimentos pode receber eventuais serviços
          adicionais fornecidos por Corretoras em razão de sua contratação e
          relacionamento. A Portopar DTVM recebe remuneração de distribuição
          do(s)Administrador(es) e/ou do(s) Fundo(s) de Investimento em que seus
          clientes aplicam recursos, seja na forma de investimento direto, seja
          por meio de conta e ordem e que esta remuneração pode ser diferenciada
          em função dos diversos Fundos de Investimento investidos.
        </p>
        <ImgAnbima src={logoAnbima} alt="Logo anbima" />
      </FooterWrapper>
    </Section>
  )
}
