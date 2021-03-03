import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Loading from 'components/Loading'

import * as s from 'pages/CreditCard/Creation/ClientInfoStep/styles'

const ForthStepLoadingState = () => (
  <>
    <s.FullHeightRow>
      <Col col={12}>
        <s.CenterContentCard>
          <Loading
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
            textAlign="center"
          />
        </s.CenterContentCard>
      </Col>
    </s.FullHeightRow>
  </>
)

export default ForthStepLoadingState
