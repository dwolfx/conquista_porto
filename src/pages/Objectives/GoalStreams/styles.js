import styled from 'styled-components'
import Text from 'components/Text'

import Inputs from 'components/Inputs/Text'
import InputDate from 'components/Inputs/DateInput'

export const Container = styled.div``

export const SectionBar = styled.section`
  background-color: ${props => props.theme.fundRiskColors.lowRisk};
  padding: 1rem 0;
`

export const Section = styled.section`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  padding: 5rem 0;
`

export const WrapperDefault = styled.div`
  margin: 5rem auto;
`

export const Wrapper = styled.div`
  align-items: flex-end;
  display: flex;
  background-color: ${props => props.theme.colors.gray1};
  border-bottom: 2px solid ${props => props.theme.colors.gray5};
  margin: 5rem auto;
  min-height: 70px;
  padding: 0 15px;
`

export const Question = styled(Text).attrs({ type: 'heading3' })`
  text-align: center;
`

export const QuestionRule = styled(Text).attrs({ type: 'headline' })`
  margin-top: 15px;
  text-align: center;
`

export const TitleBar = styled(Text).attrs({ type: 'headline' })`
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`

export const Input = styled(Inputs).attrs({ width: '100' })`
  && {
    border: none;
    height: 50px;
    padding: 0;
    text-transform: uppercase;
  }
`

export const Date = styled(InputDate)`
  && {
    border: none;
    height: 50px;
    padding: 0;
  }
`
