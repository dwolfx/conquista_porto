import styled from 'styled-components'

import Text from 'components/Text'
import Loading from 'components/Loading'
import { LegendText } from 'components/Loading/styles'

export const Container = styled.div`
  padding-top: ${({ theme }) => `${theme.spacing(3)}px`};
  padding-left: ${({ theme }) => `${theme.spacing(2)}px`};

  @media ${props => props.theme.mediaQueries.sm} {
    padding-left: 0;
  }
`

export const TableContainer = styled.div`
  max-height: 300px;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const TextAccordionHeader = styled(Text).attrs(() => ({
  type: 'heading4',
  color: 'gray6',
  bold: true,
}))`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`
export const InfoContainer = styled.div`
  height: 300px;
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

export const LoadingStyled = styled(Loading)`
  ${LegendText} {
    text-align: center;
  }
`
