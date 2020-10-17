import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components/macro'
import 'styled-components/macro'

import { Col, Row } from 'styled-bootstrap-grid'
import Loading from 'components/Loading'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import useMedia from 'hooks/useMedia'
import { formatMoney, capitalize } from 'helpers'

import SquareRisk from 'components/FundDetail/Card/SquareRisk'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import {
  LayerCard,
  VerticalListMargin,
  ContentLayerCard,
  EmptyStateWrapper,
  TextTitle,
  TextValue,
  ColumnItem,
  TextError,
} from './styles'

interface IData {
  minimo_inicial: string
  perfil_risco: string
  nome_carteira: string
  resgate_cotizacao: string
  aplicao_minima: string
  id_carteira: number
  categoria_arena: string
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
  handleFundDetailOpen?: () => void
  selectedFundId: number
  isRedeem?: boolean
}

const FundDetailCard = ({
  handleFundDetailOpen,
  selectedFundId,
  isRedeem,
}: IProps) => {
  const dispatch = useDispatch()
  const themeContext = useContext(ThemeContext)

  let { data: fundDetails, isLoading, isError } = useSelector((state: any) => {
    return {
      ...state.investmentDetails,
      data: Object.keys(state.investmentDetails.data).length
        ? state.investmentDetails.data
        : null,
    }
  })

  useEffect(() => {
    dispatch(GetInvestmentDetailsRequest(selectedFundId))
  }, [selectedFundId, dispatch])

  const headerTitle =
    !isLoading && !isError && fundDetails ? fundDetails.nome_carteira : ''


  const mobile = useMedia('xs')

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

      {isError && !isLoading && !fundDetails && (
        <EmptyStateWrapper>
          <TextError type="headline" color="magenta2">
            Não foi possível carregar as informações deste fundo de
            investimento.
          </TextError>
          <Button
            data-testid="test-button-tentar-novamente"
            css={`
              margin-top: ${themeContext.spacing(2)};
            `}
            onClick={() =>
              dispatch(GetInvestmentDetailsRequest(selectedFundId))
            }
          >
            Tentar novamente
          </Button>
        </EmptyStateWrapper>
      )}
      {!mobile && !isLoading && !isError && fundDetails ? (
        <ContentLayerCard>
          <Row>
            <ColumnItem>
              <VerticalListMargin
                elements={[
                  <TextTitle>
                    {isRedeem ? 'horário limite' : 'aplicação inicial mínima'}
                  </TextTitle>,
                  <TextValue>
                    {isRedeem
                      ? fundDetails.hora_resgate
                      : formatMoney(fundDetails.minimo_inicial)}
                  </TextValue>,
                ]}
              />
            </ColumnItem>
            <Col hiddenLgDown>
              <Divisor />
            </Col>
            <ColumnItem>
              <VerticalListMargin
                elements={[
                  <TextTitle>
                    {isRedeem ? 'saldo mínimo' : 'movimentação mínima'}
                  </TextTitle>,
                  <TextValue>
                    {isRedeem
                      ? formatMoney(fundDetails.saldo_minimo)
                      : formatMoney(fundDetails.aplicao_minima)}
                  </TextValue>,
                ]}
              />
            </ColumnItem>
            <Col hiddenLgDown>
              <Divisor />
            </Col>
            <ColumnItem>
              <VerticalListMargin
                elements={[
                  <TextTitle>Resgate (Cotização)</TextTitle>,
                  <TextValue>{fundDetails.resgate_cotizacao}</TextValue>,
                ]}
              />
            </ColumnItem>
            <Col hiddenLgDown>
              <Divisor />
            </Col>
            <ColumnItem>
              <VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase">
                    Categoria
                  </Text>,
                  <Text bold color="gray6" type="headline">
                    {fundDetails?.categoria_arena?.toLowerCase() ===
                      'renda variável'
                      ? 'Ações'
                      : fundDetails.categoria_arena}
                  </Text>,
                ]}
              />
            </ColumnItem>
            <Col hiddenLgDown>
              <Divisor />
            </Col>
            <ColumnItem>
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
            </ColumnItem>
          </Row>
        </ContentLayerCard>
      ) : null}
    </LayerCard>
  )
}

export default FundDetailCard
