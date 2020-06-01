import React from 'react'

import { FILTER_RISKS } from '../../FundsList/constants'
import { SquareRiskContainer, SquareRiskLevel } from './styles'

export interface IProps {
  tabletVersion?: boolean
  perfilRisco: string
}

const SquareRisk = ({ tabletVersion = false, perfilRisco = '' }: IProps) => {
  return (
    <SquareRiskContainer tabletVersion={tabletVersion}>
      <SquareRiskLevel
        selectedRisk={perfilRisco}
        value={FILTER_RISKS[1]}
        color="darkBlue2"
      />
      <SquareRiskLevel
        selectedRisk={perfilRisco}
        value={FILTER_RISKS[2]}
        color="blue4"
      />
      <SquareRiskLevel
        selectedRisk={perfilRisco}
        value={FILTER_RISKS[3]}
        color="green3"
      />
      <SquareRiskLevel
        selectedRisk={perfilRisco}
        value={FILTER_RISKS[4]}
        color="yellow2"
      />
      <SquareRiskLevel
        selectedRisk={perfilRisco}
        value={FILTER_RISKS[5]}
        color="magenta2"
      />
    </SquareRiskContainer>
  )
}

export default SquareRisk
