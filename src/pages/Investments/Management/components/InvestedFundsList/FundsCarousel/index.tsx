import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Carousel from 'components/Carousel'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import { formatMoney } from 'helpers'
import {
  ButtonVertical,
  NextButton,
  PrevButton,
  Chip,
  ContentContainer,
} from './styles'

const CustomNextArrow = () => {
  return <NextButton />
}

const CustomPreviousArrow = () => {
  return <PrevButton />
}

let customSettings = {
  dots: false,
  arrows: true,
  variableWidth: true,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: CustomNextArrow(),
  prevArrow: CustomPreviousArrow(),
}

const CustomSlides = ({
  fund,
  displayInformation,
  selectedFund,
  onChangeSelectedFund,
}: {
  fund: any
  displayInformation: boolean
  selectedFund: string
  onChangeSelectedFund: (id: string) => void
}) => {
  return (
    <Chip
      onClick={() => onChangeSelectedFund(fund.id_carteira)}
      selected={selectedFund === fund.id_carteira}
      data-testid="component-chip"
    >
      <VerticalList
        elements={[
          <Text type="captionUppercase" bold color="gray6">
            {fund.categoria_arena === 'Renda Variável'
              ? 'Ações'
              : fund.categoria_arena}
          </Text>,
          <Text
            type="caption"
            bold
            color={selectedFund === fund.id_carteira ? 'blue4' : 'gray5'}
          >
            {fund.apelido}
          </Text>,
        ]}
        css={`
          padding: 0;
        `}
      />
      <Text
        type="body"
        data-testid="text-fund-value"
        bold
        css={`
          -webkit-text-security: ${displayInformation ? 'disc' : 'none'};
        `}
        color={selectedFund === fund.id_carteira ? 'gray6' : 'gray5'}
      >
        {formatMoney(fund.saldo_atual)}
      </Text>
    </Chip>
  )
}

interface IFundsCarousel {
  filteredFunds: any[]
  displayInformation: boolean
  idFund: string
  onHandleChangeIdFund: (idFund: string) => void
}
const FundsCarousel = ({
  filteredFunds,
  displayInformation,
  idFund,
  onHandleChangeIdFund,
}: IFundsCarousel) => {
  const history = useHistory()
  const isTabletHorizontal = useMedia('lg')
  const isTabletVertical = useMedia('md')

  if (isTabletHorizontal) {
    customSettings = {
      ...customSettings,
      slidesToShow: 2,
      arrows: false,
    }
  }

  if (isTabletVertical) {
    customSettings = {
      ...customSettings,
      slidesToShow: 1,
      arrows: false,
    }
  }

  if (!isTabletHorizontal && !isTabletVertical) {
    customSettings = {
      ...customSettings,
      arrows: true,
      slidesToShow: 3,
    }
  }

  return (
    <ContentContainer>
      <ButtonVertical
        color="primary"
        icon="add"
        data-testid="button-add-fund"
        onClick={() => history.push('/investimentos/lista-fundos')}
      />
      <Carousel
        data-testid="test-carousel"
        settings={customSettings}
        css={`
          width: calc(100% - 63px);
        `}
      >
        {filteredFunds.map((fund: any) => (
          <CustomSlides
            key={`fund-chip-${fund.id_carteira}`}
            fund={fund}
            displayInformation={displayInformation}
            selectedFund={idFund}
            onChangeSelectedFund={() => onHandleChangeIdFund(fund.id_carteira)}
          />
        ))}
      </Carousel>
    </ContentContainer>
  )
}

export default FundsCarousel
