import styled from 'styled-components'

import Button from 'components/Button'
import NewInput from 'components/NewInput'
import Text from 'components/Text'

import { Row as RowComponent, Col } from 'styled-bootstrap-grid'

export const Row = styled(RowComponent)`
  height: calc(100% - 56px);
  background-color: ${({ theme }) => theme.colors.white};

  @media ${props => props.theme.mediaQueries.lg} {
    height: auto
  }

  @media ${props => props.theme.mediaQueries.md} {
    height: calc(100% - 56px);
  }

  @media ${props => props.theme.mediaQueries.sm} {
    height: auto
  }
`

export const StyledMain = styled(Col)`
  padding-top: ${({ theme }) => `${theme.spacing(6)}px`};
  margin: 0 auto;
`

export const StyledText = styled(Text).attrs({
  type: 'heading4',
  color: 'gray6',
  textAlign: 'center',
})`
  width: 70%;
  margin: 0 auto;
`

export const AnotherStyledText = styled(Text).attrs({
  type: 'body',
  color: 'gray5',
  textAlign: 'center',
  bold: true,
})`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  > div {
    & + div {
      margin-top: ${({ theme }) => theme.spacing(4)}px;
    }
  }

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`
export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const StyledInput = styled(NewInput)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(3)}px`};
  width: 100%;
`

export const SelectWrapper = styled.div`
  width: 100%;
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;

    > div {
      & + div {
        margin-top: ${({ theme }) => theme.spacing(4)}px;
      }
    }
  }

  @media ${props => props.theme.mediaQueries.smUp} {
    > div {
      & + div {
        margin-top: 0;
        margin-left: ${({ theme }) => theme.spacing(2)}px;
      }
    }
  }
`

export const Footer = styled.div`
  margin: ${({ theme }) => `${theme.spacing(4)}px 0 ${theme.spacing(6)}px`};
`

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-height: calc(100% - 56px);
  display: flex;
  align-items: center;
`