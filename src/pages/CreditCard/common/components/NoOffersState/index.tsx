import React from 'react'
import { useDispatch } from 'react-redux'
import { Col } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'
import { CloseCreationLayer } from 'store/modules/CreditCard/action'

import * as s from 'pages/CreditCard/Creation/ClientInfoStep/styles'

const ForthStepNoOffersState = () => {
  const dispatch = useDispatch()
  return (
    <>
      <s.FullHeightRow>
        <Col col={12}>
          <s.CenterContentCard>
            <s.CenterContentCardWrapper>
              <s.IconWrapper> 
                <Icon name="alertrounded" color="yellow2" width={28} height={28} />
              </s.IconWrapper>
              <div>
                <s.TextTitleNoOffer>Nenhuma oferta disponível no momento.</s.TextTitleNoOffer>
                <s.TextBodyNoOffer>
                  Infelizmente não possuímos nenhuma oferta no momento. Por favor, tente novamente em alguns dias.
                </s.TextBodyNoOffer>
              </div>
            </s.CenterContentCardWrapper>
          </s.CenterContentCard>
        </Col>
      </s.FullHeightRow>
      <s.Footer 
        data-testid="footer-layer"
      >
        <s.ButtonPrimary onClick={() => dispatch(CloseCreationLayer())}>
          inicio
        </s.ButtonPrimary>
      </s.Footer>
    </>
  )
}

export default ForthStepNoOffersState