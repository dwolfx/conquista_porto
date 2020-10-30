import styled from 'styled-components'
import HorizontalList from 'components/HorizontalList'
import Card from 'components/Card'

export const StyledErrorOrLoadingCard = styled(Card)`
  height: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(6)}px;

  > div {
    flex: unset;
  }

  p {
    width: 75%;
    margin: ${({ theme }) => `0 auto ${theme.spacing(1)}px`};
  }

  button {
    width: 70%;
    margin: 0 auto;
  }
`

export const StyledCard = styled(Card)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    & + & {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
    margin-left: ${({ theme }) => theme.spacing(1)}px;
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  }
`

export const StyledHorizontalList = styled(HorizontalList)`
  height: ${({ theme }) => theme.spacing(4)}px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px`};

  button {
    width: 100%;
  }
`
