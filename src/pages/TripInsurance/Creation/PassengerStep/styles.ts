import styled from 'styled-components'
import { Container, Row as RowComponent } from 'styled-bootstrap-grid'

import InputNumber from 'components/Inputs/Number'
import Button from 'components/Button'
import TextCmp from 'components/Text'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  background-color: ${({ theme }) => theme.colors.white};

  @media ${props => props.theme.mediaQueries.xs} {
    height: 100%;
  }
`

export const StyledContainer = styled(Container)`
  padding: ${({ theme }) => `${theme.spacing(14)}px ${theme.spacing(2)}px`};
  height: 100%;

  @media ${props => props.theme.mediaQueries.xs} {
    padding-top: ${({ theme }) => `${theme.spacing(3)}px`};
    padding-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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

export const PopoverText = styled(TextCmp)`
  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 185px;
  }
`

export const SubTitle = styled(TextCmp)`
  width: 335px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: fit-content;
  }
`
