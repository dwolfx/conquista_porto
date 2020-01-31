import React from 'react'
import { Container } from 'styled-bootstrap-grid'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

import { GridRecommendation, SectionsRecommendation } from './styles'

const Recommendation = goalData => {
  const {
    goal,
    combo,
    income,
    funds,
    creditProduct,
    additional,
  } = goalData.goalData
  return (
    <GridRecommendation>
      <TopBar goal={goal} />
      <SectionsRecommendation>
        <Container>
          <SectionOne combo={combo} income={income} />
          <SectionTwo funds={funds} creditProduct={creditProduct} />
          <SectionThree additional={additional} />
        </Container>
      </SectionsRecommendation>

      <BottomBar />
    </GridRecommendation>
  )
}

export default Recommendation
