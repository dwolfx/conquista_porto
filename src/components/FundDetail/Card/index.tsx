import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components/macro'
import 'styled-components/macro'

import { Col, Row } from 'styled-bootstrap-grid'
import Loading from 'components/Loading'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import { formatMoney, capitalize } from 'helpers'

import SquareRisk from './SquareRisk'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import {
  LayerCard,
  VerticalListMargin,
  ContentLayerCard,
  EmptyStateWrapper,
  TextTitle,
  TextValue,
} from './styles'

interface IProps {
  handleFundDetailOpen?: () => void
  selectedFundId?: string
}

const FundDetailCard = ({ handleFundDetailOpen, selectedFundId }: IProps) => {
  const dispatch = useDispatch()
  const themeContext = useContext(ThemeContext)

  let { data: fundDetails, isLoading, hasError, idFund } = useSelector(
    (state: any) => {
      return {
        ...state.investmentDetails,
        data: Object.keys(state.investmentDetails.data).length
          ? state.investmentDetails.data
          : null,
        idFund: !!selectedFundId
          ? selectedFundId
          : state.investmentPosition.idFund,
      }
    }
  )

  if (
    !!selectedFundId &&
    fundDetails?.id_fundo !== selectedFundId &&
    !isLoading &&
    !hasError
  ) {
    dispatch(GetInvestmentDetailsRequest(idFund))
  }

  const headerTitle =
    !isLoading && !hasError && fundDetails ? fundDetails.nome_carteira : ''

  return (
    <LayerCard
      headerTitle={headerTitle}
      headerIconInfo
      headerIconInfoClick={handleFundDetailOpen}
      headerIconInfoMsg="Mais informações"
    >
      {isLoading && !fundDetails && (
        <EmptyStateWrapper>
          <Loading
            data-testid="test-loading-component"
            type="bar"
            legend="Buscando informações do fundo de investimento..."
          />
        </EmptyStateWrapper>
      )}

      {hasError && !isLoading && !fundDetails && (
        <EmptyStateWrapper>
          <Text type="headline" color="magenta2">
            Não foi possível carregar as informações deste fundo de
            investimento.
          </Text>
          <Button
            css={`
              margin-top: ${themeContext.spacing(2)};
            `}
            onClick={() => dispatch(GetInvestmentDetailsRequest(idFund))}
          >
            Tentar novamente
          </Button>
        </EmptyStateWrapper>
      )}
      {!isLoading && !hasError && fundDetails ? (
        <ContentLayerCard>
          <Row>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <TextTitle>Aplicação inicial mínima</TextTitle>,
                  <TextValue>
                    {formatMoney(fundDetails.minimo_inicial)}
                  </TextValue>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <TextTitle>Movimentação mínima</TextTitle>,
                  <TextValue>
                    {formatMoney(fundDetails.aplicao_minima)}
                  </TextValue>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <TextTitle>Resgate (Cotização)</TextTitle>,
                  <TextValue>{fundDetails.resgate_cotizacao}</TextValue>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <TextTitle>Categoria</TextTitle>,
                  <TextValue bold color="gray6" type="headline">
                    {fundDetails.categoria.toLowerCase() === 'renda variável'
                      ? 'Ações'
                      : fundDetails.categoria}
                  </TextValue>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <TextTitle>Nível de Risco</TextTitle>,
                  <HorizontalList
                    noPadding
                    size="small"
                    startItems={[
                      <TextValue
                        css={`
                          width: max-content;
                        `}
                      >
                        {capitalize(fundDetails.perfil_risco)}
                      </TextValue>,
                      <SquareRisk
                        perfilRisco={fundDetails.perfil_risco}
                        tabletVersion
                      />,
                    ]}
                  />,
                ]}
              />
            </Col>
          </Row>
        </ContentLayerCard>
      ) : null}
    </LayerCard>
  )
}

export default FundDetailCard
