import Divisor from 'components/Divisor'
import StepBar from 'components/StepBar'
import useMedia from 'hooks/useMedia'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import React from 'react'

import * as s from './styles'

const InformationConfirmation: React.FC = () => {
  const { hire, page, buttons } = texts()
  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')

  return (
    <>
      <StepBar
        title={hire.title}
        type={page}
        actualStep={hire.steps.informationConfirmation.actualStep}
        totalNumberOfSteps={hire.stepMax}
      />
      <s.ContentContainer>
        <s.Column lg={3}>
          <s.TitleWrapper>
            <s.TitleText type="heading4" bold>
              {hire.steps.informationConfirmation.title}
            </s.TitleText>
            {isLgUp ? <Divisor /> : null}
            <s.TitleText color="gray6" type={isSmUp ? 'headline' : 'body'}>
              {hire.steps.informationConfirmation.subtitle}
            </s.TitleText>
          </s.TitleWrapper>
        </s.Column>
        <s.Column lg={8} md={10}></s.Column>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.FooterContent>
          <s.RowContent>
            <s.Column lg={3} />
            <s.Column lg={8} md={11}>
              <s.ButtonAlign>
                <s.NextButton color="secondary">{buttons.next}</s.NextButton>
              </s.ButtonAlign>
            </s.Column>
          </s.RowContent>
        </s.FooterContent>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
