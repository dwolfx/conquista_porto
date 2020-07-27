import styled from 'styled-components'
import CardComponent from 'components/Card'
import { CardHeader, CardBody } from 'components/Card/styles'

export const CardStyled = styled(CardComponent)`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
    padding: 0;
    ${CardHeader} {
      font-size: ${({ theme }) => theme.fontTypes.heading4} !important;
      padding: ${({ theme }) => theme.spacing(3)}px;
    }
  }

  ${CardBody} {
    overflow-y: auto;

    @media ${({ theme }) => theme.mediaQueries.xs} {
      overflow: none;
    }
  }
`

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${props => props.theme.spacing(2)}px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  z-index: 1;
`
