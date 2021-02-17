import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import StepBar from 'pages/TripInsurance/commons/StepBar'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import InsuranceSumary from '../InsuranceSumary'

import { StepComponent } from 'hooks/FluxManagement/types'
import * as S from '../styles'

const SuccessState: StepComponent = () => {
  const history = useHistory()
  const { reset } = useStackFluxManagement<StepComponentProps>()

  return (
    <>
      <StepBar title="Contratação" showSteps={false} />
      <S.Container>
        <Row>
          <Col lg={3} md={4} sm={12}>
            <InsuranceSumary />
          </Col>
          <Col lg={9} md={8} sm={12}>
            <S.StatusCard
              footer={
                <S.Button
                  onClick={() => {
                    reset()
                    history.push('/')
                  }}
                >
                  inicio
                </S.Button>
              }
            >
              <S.CardBodyWrapper data-testid="hire-status-success">
                <S.ContentWrapper>
                  <S.IconWrapper>
                    <S.SuccessIcon />
                  </S.IconWrapper>
                  <S.StatusTextWrapper>
                    <S.TextStatusTitle>
                      Tudo certo com a solicitação do seu Seguro Viagem.
                    </S.TextStatusTitle>
                    <S.TextStatusDescription>
                      Agora, basta acessar seu e-mail e assinar eletronicamente
                      a proposta.
                    </S.TextStatusDescription>
                  </S.StatusTextWrapper>
                </S.ContentWrapper>
              </S.CardBodyWrapper>
            </S.StatusCard>
          </Col>
        </Row>
      </S.Container>
    </>
  )
}

export default SuccessState
