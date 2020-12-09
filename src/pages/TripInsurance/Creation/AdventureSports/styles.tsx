import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import { Container, Row } from 'styled-bootstrap-grid'

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

export const ContentContainer = styled(Container)`
  height: 100%;
`

export const RowContainer = styled(Row)`
  height: 100%;
`

export const NextButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 318px;
    margin-left: auto;
    margin-right: auto;
  }
`
export const QuestionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`
