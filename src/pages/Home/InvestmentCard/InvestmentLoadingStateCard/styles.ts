import styled from 'styled-components'

import CardComponent from 'components/Card'

export const Card = styled(CardComponent)`
  height: 490px;
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    height: 458px;
  }

  /* Desktop = 1280px Up */
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    height: 518px;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing(5)}px;
`
