import React from 'react'
import 'styled-components/macro'

import Carousel from 'components/Carousel'
import IconFilter from 'components/Button/Icon'

import { Settings } from 'react-slick'

import { useHistory } from 'react-router-dom'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import {
  ButtonVertical,
  ChangePageButton,
  Chip,
  ContentContainer,
} from './styles'

export const CustomNextArrow = () => {
  return (
    <ChangePageButton>
      <IconFilter icon="arrowright" size="small" isLoading={false} />
    </ChangePageButton>
  )
}

export const CustomPreviousArrow = () => {
  return (
    <ChangePageButton>
      <IconFilter icon="arrowleft" size="small" isLoading={false} />
    </ChangePageButton>
  )
}

export const customSettings: Settings = {
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
  ...rest
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
  return (
    <ContentContainer>
      <Carousel data-testid="test-carousel" settings={customSettings}>
        <ButtonVertical
          color="primary"
          icon="add"
          data-testid="button-add-fund"
          onClick={() => history.push('/investimentos/lista-fundos')}
        />
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
