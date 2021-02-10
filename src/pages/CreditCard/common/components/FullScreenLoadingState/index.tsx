import React from 'react'
import { useDispatch } from 'react-redux'
import { Col } from 'styled-bootstrap-grid'

import Loading from 'components/Loading'
import { CloseCreationLayer } from 'store/modules/CreditCard/action'

import * as s from 'pages/CreditCard/Creation/ClientInfoStep/styles'

const ForthStepLoadingState = () => {
  const dispatch = useDispatch()
  return (
    <>
      <s.FullHeightRow>
        <Col col={12}>
          <s.CenterContentCard>
            <Loading
              type="bar"
              legend="Aguarde, estamos ofertas de cartão de crédito..."
              textAlign="center"
            />
          </s.CenterContentCard>
        </Col>
      </s.FullHeightRow>
      <s.Footer data-testid="footer-layer">
        <s.ButtonPrimary onClick={() => dispatch(CloseCreationLayer())}>
          inicio
        </s.ButtonPrimary>
      </s.Footer>
    </>
  )
}

export default ForthStepLoadingState
