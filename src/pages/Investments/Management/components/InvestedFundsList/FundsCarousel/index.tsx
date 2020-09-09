import React from 'react'
import { useHistory } from 'react-router-dom'
import Slider, { Settings } from 'react-slick'
import 'styled-components/macro'

import Carousel from 'components/Carousel'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import { formatMoney } from 'helpers'
import * as s from './styles'
import * as t from '../types'
import { IFund } from 'store/modules/Investment/Position/iPositions'

let customSettings: Settings = {
  dots: false,
  arrows: true,
  variableWidth: true,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
}

const CustomSlides = ({
  fund,
  displayInformation,
  selectedFund,
  onChangeSelectedFund,
}: {
  fund: IFund
  displayInformation: boolean
  selectedFund: number
  onChangeSelectedFund: (id: number) => void
}) => {
  return (
    <s.Chip
      onClick={() => onChangeSelectedFund(fund.id)}
      selected={selectedFund === fund.id}
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
            color={selectedFund === fund.id ? 'blue4' : 'gray5'}
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
        color={selectedFund === fund.id ? 'gray6' : 'gray5'}
      >
        {fund.saldo_bruto}
      </Text>
    </s.Chip>
  )
}

const FundsCarousel = React.forwardRef<Slider, t.IFundsCarousel>(
  (
    {
      filteredFunds,
      displayInformation,
      idFund,
      onHandleChangeIdFund,
      setCount,
    },
    ref
  ) => {
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
        arrows: false,
        slidesToShow: 3,
        beforeChange: (current, next) => setCount(next + 1),
      }
    }

    return (
      <s.ContentContainer>
        <s.ButtonVertical
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
          ref={ref}
        >
          {filteredFunds.map((fund: IFund) => (
            <CustomSlides
              key={`fund-chip-${fund.id}`}
              fund={fund}
              displayInformation={displayInformation}
              selectedFund={idFund}
              onChangeSelectedFund={() => onHandleChangeIdFund(fund.id)}
            />
          ))}
        </Carousel>
      </s.ContentContainer>
    )
  }
)

export default FundsCarousel
