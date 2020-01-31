import React from 'react'
import { Container } from 'styled-bootstrap-grid'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

import { GridRecommendation, SectionsRecommendation } from './styles'

const Recommendation = () => {
  const additionalProducts = {
    travelSecurity: false,
    lifeSecurity: true,
    creditCard: true,
  }

  return (
    <GridRecommendation>
      <TopBar />

      <SectionsRecommendation>
        <Container>
          <SectionOne />
          <SectionTwo />
          <SectionThree additionalProducts={additionalProducts} />
        </Container>
      </SectionsRecommendation>

      <BottomBar />
    </GridRecommendation>
  )
}

export default Recommendation
