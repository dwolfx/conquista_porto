import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import { Col, Row } from 'styled-bootstrap-grid'

export const Wizard = styled.div`
  background-color: ${props => props.theme.colors.white};
`

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
  margin: 0;
`

export const ButtonAction = styled(Button)`
  width: 100%;
`

export const PageBar = styled(Text).attrs(() => ({ type: 'title' }))`
  color: ${props => props.theme.colors.gray4};
  text-transform: uppercase;
`

export const Question = styled(Text).attrs(() => ({ type: 'heading4' }))`
  text-align: center;
  text-transform: none;
`

export const RuleText = styled(Text).attrs(() => ({ type: 'body' }))`
  text-align: center;
`
export const ColQuestion = styled(Col)`
  min-height: 90px;
`

export const BodyWizard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 151px);
`

export const Nickname = styled(Text).attrs(() => ({ type: 'heading4' }))`
  color: ${props => props.theme.colors.white};
  font-weight: normal;
  text-transform: none;
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.fundRiskColors.lowRisk};
  padding: 10px 0;
`

export const TitleBar = styled(Text).attrs(() => ({ type: 'heading4' }))`
  color: ${props => props.theme.colors.gray4};
  text-transform: none;
  span {
    color: ${props => props.theme.colors.white};
  }
`

export const InputWrapper = styled.div`
  margin: 4rem auto;
`
