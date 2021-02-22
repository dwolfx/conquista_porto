import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import InsuranceSumary from '../InsuranceSumary'
import StepBar from '../../../commons/StepBar'

import { StepComponent } from 'hooks/FluxManagement/types'
import * as S from '../styles'

const ErrorState: StepComponent = () => {
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
                  início
                </S.Button>
              }
            >
              <S.CardBodyWrapper data-testid="hire-status-error">
                <S.ContentWrapper>
                  <S.IconWrapper>
                    <S.ErrorIcon />
                  </S.IconWrapper>
                  <S.StatusTextWrapper>
                    <S.TextStatusTitle>
                      Não foi possível confirmar sua solitação
                    </S.TextStatusTitle>
                    <S.TextStatusDescription>
                      Tente novamente mais tarde, por favor.
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

export default ErrorState
