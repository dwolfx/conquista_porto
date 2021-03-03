import React, { useState, useContext, useLayoutEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'
import Checkbox from 'components/Inputs/Checkbox'
import Button from 'components/Button'

import { ISummaryStep } from 'pages/CreditCard/Creation/types'
import PersonalData from 'pages/CreditCard/common/components/PersonalData'
import CardData from 'pages/CreditCard/common/components/CardData'
import { StyledCard } from 'pages/CreditCard/common/components/CardData/styles'
import DeliveryData from 'pages/CreditCard/common/components/DeliveryData'

import { GridContainer } from '../styles'
import * as S from './styles'

const FifthStep = ({
  formData,
  setFormData,
  onSubmit,
  retrySubmit,
  isLoading,
}: ISummaryStep) => {
  const [isChecked, setChecked] = useState(false)
  const themeContext = useContext(ThemeContext)

  useLayoutEffect(() => {
    const layerChildrenElement = document.querySelector('#layer-children')
    if (layerChildrenElement) {
      layerChildrenElement.scrollTo({ 
        top: 0
      })
    }
  }, [])

  return (
    <>
      <S.Wrapper>
        <GridContainer>
          <Row>
            <Col lg={3} md={12}>
              <S.StyledVerticalList
                elements={[
                  <Text bold type="heading4" color="gray6">
                    Resumo
                  </Text>,
                  <Text bold type="body" color="gray5">
                    Antes de enviar a solicitação, por favor, revise as
                    informações.
                  </Text>,
                ]}
              />
            </Col>
            <S.StyledCol lg={8} md={12}>
              <PersonalData formData={formData} setFormData={setFormData} />
              <CardData formData={formData} setFormData={setFormData} />
              <DeliveryData formData={formData} setFormData={setFormData} />
              <StyledCard
                css={`
                  margin-bottom: ${themeContext.spacing(11)}px;
                `}
              >
                <S.CheckboxWrapper>
                  <Checkbox
                    data-testid="credit-card-check"
                    id="credit-card-check"
                    checked={isChecked}
                    onChange={() => setChecked(!isChecked)}
                    label={
                      <S.StyledText bold type="body" color="gray6">
                        Concordo com a solicitação do Cartão de Crédito Porto
                        Seguro e com as condições do contrato, que será enviado
                        com o cartão.
                      </S.StyledText>
                    }
                  />
                </S.CheckboxWrapper>
              </StyledCard>
            </S.StyledCol>
          </Row>
        </GridContainer>
      </S.Wrapper>

      <S.Footer>
        <Button
          color="secondary"
          disabled={!isChecked}
          loading={isLoading}
          onClick={() => onSubmit()}
        >
          {retrySubmit ? 'TENTAR NOVAMENTE' : 'SOLICITAR CARTÃO'}
        </Button>
      </S.Footer>
    </>
  )
}

export default FifthStep
