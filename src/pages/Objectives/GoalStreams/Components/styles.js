import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import { Row } from 'styled-bootstrap-grid'

export const Wizard = styled.div``

export const Container = styled.div``

export const WizardStep = styled.div`
  padding: 0 7px;
  width: 100%;
`

export const WizardButtom = styled.div`
  display: flex;
  justify-content: center;
  & > button:nth-child(2) {
    margin-left: 7px;
  }
`
export const RowFull = styled(Row)`
  justify-content: center;
  width: 100%;
`

export const ButtonAction = styled(Button)`
  width: 100%;
`

export const PageBar = styled(Text).attrs({ type: 'title' })`
  color: ${props => props.theme.colors.gray4};
  text-transform: uppercase;
`

export const Question = styled(Text).attrs({ type: 'heading4' })`
  min-height: 66px;
  text-align: center;
  text-transform: none;
`

export const BodyWizard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 151px);
`

export const Nickname = styled(Text).attrs({ type: 'heading4' })`
  color: ${props => props.theme.colors.white};
  font-weight: normal;
  text-transform: none;
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.fundRiskColors.lowRisk};
  padding: 10px 0;
`

export const TitleBar = styled(Text).attrs({ type: 'heading4' })`
  color: ${props => props.theme.colors.gray4};
  text-transform: none;
  span {
    color: ${props => props.theme.colors.white};
  }
`

export const Wrapper = styled.div`
  margin: 4rem auto;
`
