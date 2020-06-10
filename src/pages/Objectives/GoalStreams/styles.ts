import styled from 'styled-components'

import CardComp from 'components/Card'
import Text from 'components/Text'

export const Card = styled(CardComp)`
  /* position: absolute;
  width: ${({ theme }) => `calc(100% - ${theme.spacing(2)}px)`}; */
`

export const CardBodyContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;

  img {
    border-radius: ${({ theme }) => theme.spacing(1)}px;
    max-height: 145px;
    object-fit: cover;
    width: 100%;
  }
`

export const CardText = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 0;
    padding: 0;
  }
`

export const TipContent = styled.div`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 230px;
  }
`
