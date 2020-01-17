import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'styled-bootstrap-grid'

import Header from 'components/Wizard/Header'
import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

import { GridRecommendation, SectionsRecommendation } from './styles'

const Recommendation = () => {
  const history = useHistory()

  const additionalProducts = {
    travelSecurity: false,
    lifeSecurity: true,
    creditCard: true,
  }

  return (
    <GridRecommendation>
      <Header
        onClose={() => {
          history.push('/objetivos')
        }}
      />

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
