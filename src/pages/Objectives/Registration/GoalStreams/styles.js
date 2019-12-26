import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div``

export const SectionBar = styled.section`
  background-color: ${props => props.theme.fundRiskColors.lowRisk};
  padding: 20px 0;
`
export const TitleBar = styled.p`
  color: ${props => props.theme.colors.gray1};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '34px')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
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
