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
          <SectionThree />
        </Container>
      </SectionsRecommendation>

      <BottomBar />
    </GridRecommendation>
  )
}

export default Recommendation
