import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import React from 'react'

import CardStructure from '../../InformationConfirmation/CardStructure'
import * as s from './styles'

const LenderInsurance: React.FC = () => {
  const { hire } = TextsConsortiumBuilding()
  return (
    <>
      <s.ContentContainer>
        <s.ColumnSide lg={3}>
          <s.TitleWrapper>
            <s.SideTitle type="heading4" bold>
              {hire.steps.insuranceLender.title}
            </s.SideTitle>
            <s.Text>{hire.steps.insuranceLender.subtitle}</s.Text>
          </s.TitleWrapper>
        </s.ColumnSide>
        <s.Column lg={9} md={9}>
          <CardStructure>
            <s.TitleText type="headline" bold spacing={0}>
              {hire.steps.insuranceLender.containerMain.title}
            </s.TitleText>
            <h1>Componente</h1>
            <s.Divider></s.Divider>
            <h1>Componente</h1>
          </CardStructure>
        </s.Column>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.ContentWrapperFooter>
          <s.NextButton disabled color="secondary">
            continuar
          </s.NextButton>
        </s.ContentWrapperFooter>
      </s.FooterContainer>
    </>
  )
}
export default LenderInsurance
