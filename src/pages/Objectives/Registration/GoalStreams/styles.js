import styled from 'styled-components'
import Text from 'components/Text'

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

export const Wrapper = styled.div`
  margin: 5rem auto;
`

export const Question = styled(Text).attrs({ type: 'title3' })`
  text-align: center;
`

export const QuestionRule = styled(Text).attrs({ type: 'title5' })`
  margin-top: 15px;
  text-align: center;
`

export const TitleBar = styled(Text).attrs({ type: 'title6' })`
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`
