import styled from 'styled-components'
import { Container, Row as RowComponent } from 'styled-bootstrap-grid'

import InputNumber from 'components/Inputs/Number'
import Button from 'components/Button'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  background-color: ${({ theme }) => theme.colors.white};
`

export const StyledContainer = styled(Container)`
  padding: ${({ theme }) => `${theme.spacing(14)}px ${theme.spacing(2)}px`};
  height: 100%;
`

export const Row = styled(RowComponent)`
  height: 100%;
`

export const StyledCounter = styled(InputNumber)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  width: 100%;
`

export const FlexContainer = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    width: 75%;
    margin: 0 auto;
  }

  > h5 {
    > span {
      @media ${props => props.theme.mediaQueries.mdUp} {
        display: none;
      }
      vertical-align: middle;
      margin-left: 14px;
    }
  }
`
