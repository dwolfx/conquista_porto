import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components/macro'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Button from 'components/Button'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Loading from 'components/Loading'
import SquareRisk from 'components/FundDetail/Card/SquareRisk'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { IFund } from 'store/modules/Investment/Position/iPositions'

import { formatMoney, capitalize } from 'helpers'

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
interface IProps {
  handleFundDetailOpen?: () => void
  selectedFundId: number
}

const FundDetailCard = ({ handleFundDetailOpen, selectedFundId }: IProps) => {
  const dispatch = useDispatch()
  const themeContext = useContext(ThemeContext)

  const { fundDetails, isLoading, isError, nameFund } = useSelector(
    (state: any) => ({
      fundDetails: state.investmentDetails.data,
      isLoading: state.investmentDetails.isLoading,
      isError: state.investmentDetails.isError,
      nameFund: state.investmentPosition?.data?.find(
        (item: IFund) => item.id === selectedFundId
      )?.apelido,
    })
  )

  useEffect(() => {
    dispatch(GetInvestmentDetailsRequest(selectedFundId))
  }, [selectedFundId, dispatch])

  const mobile = useMedia('xs')

  const isNotFunDetailsEmpty =
    fundDetails && Object.keys(fundDetails).length > 0 && !isLoading && !isError

  return (
    <LayerCard
      headerTitle={nameFund || ''}
      headerIconInfo
      headerIconInfoClick={handleFundDetailOpen}
      headerIconInfoMsg="Mais informações"
    >
      {isLoading && (
        <EmptyStateWrapper>
          <Loading
            data-testid="test-loading-component"
            type="bar"
            legend="Buscando informações do fundo de investimento..."
          />
        </EmptyStateWrapper>
      )}

      {isError && (
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

      {isNotFunDetailsEmpty &&
      !mobile &&
      !isLoading &&
      !isError &&
      fundDetails ? (
        <ContentLayerCard>
          <Row>
            <ColumnItem>
              <VerticalListMargin
                elements={[
                  <TextTitle>{'aplicação inicial mínima'}</TextTitle>,
                  <TextValue>
                    {formatMoney(fundDetails?.minimo_inicial)}
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
                  <TextTitle>{'movimentação mínima'}</TextTitle>,
                  <TextValue>
                    {formatMoney(fundDetails?.aplicao_minima)}
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
                  <TextValue>{fundDetails?.resgate_cotizacao}</TextValue>,
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
                      : fundDetails?.categoria_arena}
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
                        {capitalize(fundDetails?.perfil_risco)}
                      </TextValue>,
                      <SquareRisk
                        perfilRisco={fundDetails?.perfil_risco}
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
