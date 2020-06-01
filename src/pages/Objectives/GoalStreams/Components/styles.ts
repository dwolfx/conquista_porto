import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import { Col as ColBootstrap, Row } from 'styled-bootstrap-grid'

export const Wizard = styled.div`
  background-color: ${props => props.theme.colors.white};
`

export const Container = styled.div``

export const WizardStep = styled.div`
  padding: 0 7px;
  width: 100%;
`

export const WizardButton = styled.div`
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

export const Question = styled(Text).attrs(() => ({ type: 'heading4' }))`
  text-align: center;
  padding: 14px;
  text-transform: none;
`

export const RuleText = styled(Text).attrs(() => ({ type: 'body' }))`
  text-align: center;
`
export const ColQuestion = styled(ColBootstrap)`
  min-height: 90px;
`

export const BodyWizard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 151px);
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.colors.grayblue1};
  padding: ${props => props.theme.spacing(2)}px
    ${props => props.theme.spacing(4)}px;
`

export const InputWrapper = styled.div`
  margin: 4rem auto;
`

export const Form = styled.form`
  width: 100%;
`

export const Col = styled(ColBootstrap)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    display: flex;
    justify-content: center;
  }
`
