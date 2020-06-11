import styled from 'styled-components'

import Text from 'components/Text'
import Loading from 'components/Loading'
import { LegendText } from 'components/Loading/styles'

export const InfoContainer = styled.div`
  min-height: 445px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(12)}px`};

  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0 ${({ theme }) => `${theme.spacing(12)}px`};
  }

  @media ${props => props.theme.mediaQueries.md} {
    padding: 0 ${({ theme }) => `${theme.spacing(4)}px`};
  }
`
export const TextHeader = styled(Text).attrs(() => ({
  type: 'heading4',
  bold: true,
  color: 'gray6',
}))`
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px 0 ${theme.spacing(4)}px ${theme.spacing(3)}px`};
`

export const LoadingStyled = styled(Loading)`
  ${LegendText} {
    text-align: center;
  }
`
