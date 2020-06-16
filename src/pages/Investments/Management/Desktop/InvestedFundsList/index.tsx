import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import { Settings } from 'react-slick'

import VerticalList from 'components/VerticalList'
import { TFundsLayout } from '../../filters'

import Text from 'components/Text'
import Carousel from 'components/Carousel'
import {
  CardStyled,
  FundItem,
  HorizontalListStyled,
  ButtonStyled,
  Chip,
  ButtonVertical,
} from './styles'
import FundsFilter from '../FundsFilter'
import { useSelector, useDispatch } from 'react-redux'
import { SetIdFund } from 'store/modules/Investment/Position/action'

interface IProps {
  filters: any
  filteredFunds: any[]
  viewMode: TFundsLayout
  isNextPriorButtonsVisible: boolean
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

export const customSettings: Settings = {
  dots: false,
  arrows: false,
  variableWidth: true,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  className: 'spacing-card',
  slidesToShow: 3,
  slidesToScroll: 1,
}

const CustomSlides = ({
  fund,
  selectedFund,
  onChangeSelectedFund,
  ...rest
}: {
  fund: any
  selectedFund: string
  onChangeSelectedFund: (id: string) => void
}) => {
  return (
    <Chip
      onClick={() => onChangeSelectedFund(fund.id_carteira)}
      selected={selectedFund === fund.id_carteira}
    >
      <VerticalList
        elements={[
          <Text type="captionUppercase" bold color="gray6">
            {fund.categoria_arena}
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
        bold
        color={selectedFund === fund.id_carteira ? 'gray6' : 'gray5'}
      >
        R$ 96.52
      </Text>
    </Chip>
  )
}

const InvestedFundsList = ({
  filters,
  filteredFunds,
  viewMode,
  isNextPriorButtonsVisible,
  onHandleChangeView,
  onHandleChangeFilter,
}: IProps) => {
  const history = useHistory()
  const { idFund } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
  }))
  const dispatch = useDispatch()

  const onHandleChangeIdFund = (idFund: string) => {
    dispatch(SetIdFund(idFund))
  }
  return (
    <>
      <FundsFilter
        filters={filters}
        viewMode={viewMode}
        isNextPriorButtonsVisible={isNextPriorButtonsVisible}
        onHandleChangeView={onHandleChangeView}
        onHandleChangeFilter={onHandleChangeFilter}
      />
      {viewMode === 'CARDS' ? (
        <Carousel settings={customSettings}>
          <ButtonVertical
            color="primary"
            icon="add"
            onClick={() => history.push('/investimentos/lista-fundos')}
          />
          {filteredFunds.map((fund: any) => (
            <CustomSlides
              key={`fund-chip-${fund.id_carteira}`}
              fund={fund}
              selectedFund={idFund}
              onChangeSelectedFund={() =>
                onHandleChangeIdFund(fund.id_carteira)
              }
            />
          ))}
        </Carousel>
      ) : (
        <CardStyled
          footer={
            <ButtonStyled
              color="primary"
              onClick={() => history.push('/investimentos/lista-fundos')}
            >
              Adicionar fundo
            </ButtonStyled>
          }
        >
          {filteredFunds.map((fund: any) => (
            <FundItem
              key={`fund-${fund.id_carteira}`}
              selected={idFund === fund.id_carteira}
              onClick={() => onHandleChangeIdFund(fund.id_carteira)}
            >
              <HorizontalListStyled
                startItems={[
                  <VerticalList
                    elements={[
                      <Text type="captionUppercase" bold color="gray6">
                        {fund.categoria_arena}
                      </Text>,
                      <Text
                        type="body"
                        bold
                        color={idFund === fund.id_carteira ? 'blue4' : 'gray5'}
                      >
                        {fund.apelido}
                      </Text>,
                    ]}
                  />,
                ]}
                endItems={[
                  <Text
                    type="body"
                    bold
                    color={idFund === fund.id_carteira ? 'gray6' : 'gray5'}
                  >
                    R$ 96.52
                  </Text>,
                ]}
              />
            </FundItem>
          ))}
        </CardStyled>
      )}
    </>
  )
}

export default InvestedFundsList
