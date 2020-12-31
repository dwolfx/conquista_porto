import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${props => props.theme.mediaQueries.lg} {
    width: 53%;
    margin: 0 auto;

    button {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media ${props => props.theme.mediaQueries.smUp} {
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    height: calc(100vh - 275px);
  }
`

export const TextStyled = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
