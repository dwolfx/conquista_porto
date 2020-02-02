import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'styled-bootstrap-grid'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'
import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

import { GridRecommendation, SectionsRecommendation } from './styles'

const Recommendation = props => {
  const { goal, combo, income, funds, creditProduct, additional } = props
  return (
    <GridRecommendation>
      <TopBar goal={goal} />
      <SectionsRecommendation>
        <Container>
          <SectionOne goal={goal} combo={combo} income={income} />
          <SectionTwo combo={combo} funds={funds} creditProduct={creditProduct} />
          <SectionThree additional={additional} />
        </Container>
      </SectionsRecommendation>

      <BottomBar />
    </GridRecommendation>
  )
}

Recommendation.propTypes = {
  goal: PropTypes.object,
  combo: PropTypes.array,
  income: PropTypes.object,
  funds: PropTypes.array,
  creditProduct: PropTypes.object,
  additional: PropTypes.object,
}

Recommendation.defaultProps = {
  goal: {},
  combo: [],
  income: {},
  funds: [],
  creditProduct: {},
  additional: {},
}

export default Recommendation
