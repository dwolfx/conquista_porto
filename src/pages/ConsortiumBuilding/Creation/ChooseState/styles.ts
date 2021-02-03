import styled from 'styled-components'
import { Container, Row, Col as ColCmp } from 'styled-bootstrap-grid'
import TextCmp from 'components/Text'
import InputSelect from 'components/Inputs/Select'
import Button from 'components/Button'

export const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 56px);
  height: auto;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Col = styled(ColCmp)`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const StyledContainer = styled(Container)`
  height: 100%;
`

export const FlexContainer = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    width: 75%;
    margin: 0 auto;
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
`

export const StyledRow = styled(Row)`
  height: 100%;
`

export const Select = styled(InputSelect)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
`
