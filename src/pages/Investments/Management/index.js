import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import Button from 'components/Button'

import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import FundsCarouselSection from 'components/Solutions/Investments/FundsCarousel'

import Container from 'components/Management/Container'
import ManageableItem from 'components/Management/ManageableItem'
import PageContent from 'components/Management/PageContent'

import Icon from 'components/IconExporter'
import Loading from 'components/Loading'

import useFetchPosition from 'hooks/Investments/useFetchPosition'

import RedHairGirlImage from 'assets/images/red_hair_girl.jpg'
import useMedia from 'hooks/useMedia'
import AnbimaLegalInfo from 'components/AnbimaLegalInfo'
import HistoricalRentabilityTable from 'components/Solutions/Investments/FundsInfo/HistoricalRentabilityTable'
import GeneralView from './GeneralView'

import FundInformation from './FundInformation'
import BalanceEvolution from './BalanceEvolution'
import LastTransactions from './LastTransactions'

import { downloadFileSectionData } from './data'
import {
  LeftNav,
  RightContent,
  MiddleContent,
  GeneralInfo,
  AddBtnLink,
  Text,
  SectionCustomPicture,
  CustomContent,
  Picture,
  DescriptionContent,
  ComplementaryInfo,
  AccordionGeneralInfo,
  FundCategoryText,
  LoadingContainer,
} from './styles'

export default function ManagementInvestments({ history }) {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')

  const { data: positionData, isLoading } = useSelector(
    state => state.investmentPosition
  )

  const [fundSelected, setFundSelected] = useState(null)

  useEffect(() => {
    if (positionData && positionData.length > 0) {
      setFundSelected(
        Array.isArray(positionData[0].posicoes.posicao)
          ? positionData[0].posicoes.posicao[0]
          : positionData[0].posicoes.posicao
      )
    }
  }, [positionData])

  useFetchPosition()

  const renderFundosNav = () => {
    if (!positionData) {
      return null
    }

    return [positionData[0].posicoes.posicao]
      .flatMap(item => item)
      .map((item, index) => (
        <ManageableItem
          data-gtm-type="click"
          data-gtm-clicktype="card"
          data-gtm-subname="card custodia visualizar"
          data-gtm-name={item.fundo.categoria_arena}
          key={item.fundo.id_carteira}
          onClick={() => {
            setFundSelected(positionData[0].posicoes.posicao[index])
          }}
          active={fundSelected.fundo.id_carteira === item.fundo.id_carteira}
        >
          <FundCategoryText>{item.fundo.categoria_arena}</FundCategoryText>
          <Text fontSize="15px" textAlign="center">
            {item.fundo.apelido}
          </Text>
        </ManageableItem>
      ))
  }

  const renderFundsContent = () => {
    if (!positionData) {
      return null
    }

    return [positionData[0].posicoes.posicao]
      .flatMap(item => item)
      .map(item => (
        <RightContent
          isSelected={fundSelected.fundo.id_carteira === item.fundo.id_carteira}
          style={{ width: '100%' }}
          key={item.fundo.id_carteira}
        >
          <FundInformation fund={item} idCotista={positionData[0].id_cotista} />

          <BalanceEvolution fund={item} />

          <HistoricalRentabilityTable
            data={item.fundo.comparativo_hist_rentabil}
          />

          <LastTransactions
            lastOperations={
              Array.isArray(item.ultimas_operacoes.operacao)
                ? item.ultimas_operacoes.operacao
                : [item.ultimas_operacoes.operacao]
            }
          />
          <ComplementaryInfo>
            <Text
              margin="22px 0"
              lineHeight="21px"
              letterSpacing="1.5px"
              fontColor={theme.colors.gray6}
              fontWeight="600"
              fontSize="11px"
            >
              INFORMAÇÕES COMPLEMENTARES
            </Text>
            <FileDownloadSection
              data={[
                {
                  title: 'Informativo de desempenho',
                  description:
                    'Material técnico, com gráficos, informações e histórico do fundo.',
                  buttonText: 'BAIXAR ARQUIVO',
                  willRedirect: false,
                  url: item.fundo.link_infor_desempenho,
                },
              ]}
              backgroundColor="inherit"
            />
          </ComplementaryInfo>
        </RightContent>
      ))
  }

  const renderManager = () =>
    positionData &&
    positionData[0] &&
    positionData[0].posicoes &&
    positionData[0].posicoes.posicao ? (
      <Container>
        <PageContent>
          <LeftNav>
            <AddBtnLink
              data-gtm-type="click"
              data-gtm-clicktype="card"
              data-gtm-subname="card custodia visualizar"
              data-gtm-name="lista de fundos"
              onClick={() => {
                history.push('/investimentos/lista-fundos')
              }}
            >
              <Icon width="48" fill={theme.colors.gray3} name="add" />
              <Text fontColor={theme.colors.gray4} fontSize="14px">
                Lista de Fundos
              </Text>
            </AddBtnLink>

            {fundSelected ? renderFundosNav() : null}
          </LeftNav>

          <MiddleContent>
            {fundSelected ? renderFundsContent() : null}
          </MiddleContent>

          {isMobile ? (
            <AccordionGeneralInfo
              isOrangeArrow
              titleNode="Carteira de investimentos"
              gtmName="carteira de investimentos"
            >
              <GeneralInfo>
                <GeneralView />
              </GeneralInfo>
            </AccordionGeneralInfo>
          ) : (
            <GeneralInfo>
              <GeneralView />
            </GeneralInfo>
          )}
        </PageContent>
      </Container>
    ) : null

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading type="bar" />
      </LoadingContainer>
    )
  }

  return (
    <>
      {renderManager()}

      <HighlightSection
        title="Facilidade para investir"
        mainDescription="Com o Conquista, é prático e rápido investir."
        subDescription="Você confere as opções disponíveis na Lista de Fundo, consulta
        informações detalhadas de cada um e realiza seus investimentos com a
        segurança de uma plataforma da Porto Seguro."
        buttonText="lista de fundos"
        onClick={() => {
          history.push('/investimentos/lista-fundos')
        }}
      />
      <SectionCustomPicture backgroundColor="#d6dde5">
        <CustomContent>
          <Picture>
            <img src={RedHairGirlImage} alt="Mulher feliz" />
          </Picture>
          <DescriptionContent>
            <h1>Investindo em objetivos</h1>
            <p>
              No Conquista, você tem total controle para escolher os Fundos de
              Investimentos que preferir, além de auxílio inteligente para
              encontrar opções adequadas ao seu perfil e ao que você busca.
              <br />
              <br />
              Crie objetivos e aproveite os planos personalizados que a
              ferramenta apresenta para investir com mais facilidade.
            </p>
            <Button
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="investindo em objetivos"
              data-gtm-name="criar objetivo"
              color="primary"
              onClick={() => history.push('/objetivos')}
            >
              Criar Objetivo
            </Button>
          </DescriptionContent>
        </CustomContent>
      </SectionCustomPicture>
      <FundsCarouselSection />
      <FileDownloadSection data={downloadFileSectionData} />
      <AnbimaLegalInfo />
    </>
  )
}

ManagementInvestments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
