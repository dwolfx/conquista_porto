import styled from 'styled-components'

import { Col } from 'styled-bootstrap-grid'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(2)}px 0`};
`

export const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  overflow-x: hidden;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(5)}px;
    padding: 0 ${({ theme }) => theme.spacing(14)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 ${({ theme }) => theme.spacing(10)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0;
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  cursor: pointer;
  user-select: none;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(21)}px ${theme.spacing(
      2
    )}px ${theme.spacing(6)}px`};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(3)}px`};
  }
`

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(6)}px`};

  display: flex;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(2)}px`};
    justify-content: flex-start;

    button {
      width: 100%;
    }
  }
`

export const StyledCol = styled(Col)`
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(5)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) =>
      `${theme.spacing(4)}px ${theme.spacing(1)}px 0 ${theme.spacing(2)}px`};
  }
`

export const StyledVerticalList = styled(VerticalList)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(4)}px`};
  }
`
