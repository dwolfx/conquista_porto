import React from 'react'
import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import StepBar from 'components/StepBar'
import LifeInsurance from './LifeInsurance'
import CreditLifeInsurance from './CreditLifeInsurance'

const Declarations: React.FC = () => {
  const { creation, page } = TextsConsortiumBuilding()
  let check: string = 'CreditLifeInsurance'
  return (
    <>
      <StepBar
        title={creation.title}
        type={page}
        actualStep={creation.steps.state.actualStep}
        totalNumberOfSteps={creation.stepMax}
      />
      {check === 'lifeInsurance' ? <LifeInsurance /> : <CreditLifeInsurance />}
    </>
  )
}
export default Declarations
