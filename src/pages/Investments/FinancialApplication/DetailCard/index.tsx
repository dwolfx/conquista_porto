import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import { Col, Row } from 'styled-bootstrap-grid'
import Loading from 'components/Loading'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import { formatMoney, capitalize } from 'helpers'

import SquareRisk from './SquareRisk'
import {
  LayerCard,
  VerticalListMargin,
  ContentLayerCard,
  EmptyStateWrapper,
} from './styles'

interface IData {
  minimo_inicial: string
  perfil_risco: string
  nome_carteira: string
  resgate_cotizacao: string
  aplicao_minima: string
  id_fundo: string
  categoria: string
}

interface iInvestmentDetails {
  data: IData
  isLoading: boolean
  hasError: boolean
}

interface iRootState {
  investmentDetails: iInvestmentDetails
}

interface IProps {
  handleFundDetailOpen: () => void
}

const DetailCard: React.FC<IProps> = ({ handleFundDetailOpen = () => {} }) => {
  const dispatch = useDispatch()

  const { data: fundDetails, isLoading, hasError } = useSelector(
    (state: iRootState) => state.investmentDetails
  )

  const headerTitle = !isLoading && !hasError ? fundDetails.nome_carteira : ''

  return (
    <LayerCard
      headerTitle={headerTitle}
      headerIconInfo
      headerIconInfoClick={handleFundDetailOpen}
      headerIconInfoMsg="Mais informações"
    >
      {isLoading && (
        <EmptyStateWrapper>
          <Loading
            type="bar"
            legend="Buscando informações do fundo de investimento..."
          />
        </EmptyStateWrapper>
      )}

      {hasError && (
        <EmptyStateWrapper>
          <Text type="headline" color="magenta2">
            Não foi possível carregar as informações deste fundo de
            investimento.
          </Text>
          <Button
            css={`
              margin-top: 14px;
            `}
            onClick={() =>
              dispatch(GetInvestmentDetailsRequest(fundDetails.id_fundo))
            }
          >
            Tentar novamente
          </Button>
        </EmptyStateWrapper>
      )}
      {!isLoading && !hasError ? (
        <ContentLayerCard>
          <Row>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Aplicação inicial mínima
                  </Text>,
                  <Text bold color="gray6" type="headline">
                    {formatMoney(fundDetails.minimo_inicial)}
                  </Text>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Movimentação mínima
                  </Text>,
                  <Text bold color="gray6" type="headline">
                    {formatMoney(fundDetails.aplicao_minima)}
                  </Text>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Resgate (Cotização)
                  </Text>,
                  <Text bold color="gray6" type="headline">
                    {fundDetails.resgate_cotizacao}
                  </Text>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Categoria
                  </Text>,
                  <Text bold color="gray6" type="headline">
                    {fundDetails.categoria}
                  </Text>,
                ]}
              />
            </Col>
            <Col hiddenMdDown>
              <Divisor />
            </Col>
            <Col md={12} sm={4} xs={12}>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Nível de Risco
                  </Text>,
                  <HorizontalList
                    noPadding
                    size="small"
                    startItems={[
                      <Text bold color="gray6" type="headline">
                        {capitalize(fundDetails.perfil_risco)}
                      </Text>,
                      <SquareRisk
                        perfilRisco={fundDetails.perfil_risco}
                        tabletVersion
                      />,
                    ]}
                    endItems={[
                      <SquareRisk perfilRisco={fundDetails.perfil_risco} />,
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

export default DetailCard
