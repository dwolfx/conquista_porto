import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import IconExporter from 'components/IconExporter'
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

export const ContentRow = styled(Row)`
  height: 100%;
`

export const SimulateButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 318px;
    margin-left: auto;
    margin-right: auto;
  }
`
export const QuestionText = styled(Text)`
  margin: 0 ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(4)}px ${({ theme }) => theme.spacing(2)}px;
`

export const TitleInfo = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const DivisorInfo = styled(Divisor)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const InfoIcon = styled(IconExporter)`
  margin-left: ${({ theme }) => theme.spacing(1.5)}px;
  margin-bottom: -${({ theme }) => theme.spacing(0.5)}px;
`

export const TooltipText = styled(Text)`
  width: 213px;
`
