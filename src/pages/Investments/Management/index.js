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

import useFetchPosition from 'hooks/Investments/useFetchPosition'

import RedHairGirlImage from 'assets/images/red_hair_girl.jpg'
import useMedia from 'hooks/useMedia'
import AnbimaLegalInfo from 'components/AnbimaLegalInfo'
import GeneralView from './GeneralView'

import FundInformation from './FundInformation'
import BalanceEvolution from './BalanceEvolution'
import RentabilityHistoric from './RentabilityHistoric'
import LastTransactions from './LastTransactions'

import { complementaryInfo, downloadFileSectionData } from './data'
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
} from './styles'

export default function ManagementInvestments({ history }) {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')

  const positionData = useSelector(state => state.investmentPosition.data)

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

          <RentabilityHistoric fund={item.fundo} />

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
              data={complementaryInfo}
              backgroundColor="inherit"
            />
          </ComplementaryInfo>
        </RightContent>
      ))
  }

  return (
    <>
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
          {/* <GeneralInfo>
            <GeneralView />
          </GeneralInfo> */}
        </PageContent>
      </Container>
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
