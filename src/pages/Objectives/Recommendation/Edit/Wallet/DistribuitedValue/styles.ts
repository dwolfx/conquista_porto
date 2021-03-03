import styled from 'styled-components'

import CardCmp from 'components/Card'
import TextCmp from 'components/Text'
import { CardBody } from 'components/Card/styles'

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const TotalAmountDistributed = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(4)}px`};
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 127px;
  margin-right: ${({ theme }) => `${theme.spacing(32)}px`};

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: ${({ theme }) => `${theme.spacing(34)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin-right: ${({ theme }) => `${theme.spacing(20)}px`};
  }

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const InitialAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 168px;
  margin-right: ${({ theme }) => `${theme.spacing(10)}px`};

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  & > p:first-child,
  & > p:first-child + p {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const MonthlyAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 168px;

  & > p:first-child,
  & > p:first-child + p {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const ToDistributeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p + p {
    margin-left: ${({ theme }) => `${theme.spacing(1)}px`};
    margin-top: 0;
  }
`

export const MobileTotalAmountDistributedCard = styled(CardCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};

  ${CardBody} {
    width: 100%;
  }
`

export const MobileAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  & > p {
    margin: ${({ theme }) =>
      `${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  }
  & + & {
    margin-bottom: ${({ theme }) => `${theme.spacing(0.5)}px`};
    & > p {
      margin: ${({ theme }) =>
        `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
    }
  }

  &:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`
