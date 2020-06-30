import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'styled-bootstrap-grid'

import InformativeHeader from 'pages/Objectives/Recommendation/InformativeHeader'

export default function WalletComposition() {
  const recommendation = useSelector<any, any>(state => state.objective)

  return (
    <Container>
      <InformativeHeader answer={recommendation.data.answer} />
    </Container>
  )
}
