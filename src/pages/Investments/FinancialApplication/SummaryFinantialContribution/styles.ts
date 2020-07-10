import styled from 'styled-components'
import Card from 'components/Card'
import Button from 'components/Button'
import HorizontalList from 'components/HorizontalList'

import { CardBody } from 'components/Card/styles'

export const HorizontalListStyled = styled(HorizontalList)`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${props => props.theme.spacing(2)}px 0;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  z-index: 1;
`

export const CardStyled = styled(Card)`
  height: 100%;

  @media ${props => props.theme.mediaQueries.xs} {
    border-radius: 0;
    padding: ${({ theme }) => theme.spacing(3)}px 0 0 0;
    max-height: max-content;
  }

  ${CardBody} {
    max-width: 1000px;

    @media ${props => props.theme.mediaQueries.xs} {
      max-height: max-content;
    }
  }
`

const StyledButton = styled(Button)`
  font-size: 11px;
  line-height: 15px;
  margin-right: ${props => props.theme.spacing(2)}px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  &:first-child {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    margin: 0;
    width: 100%;
  }
`

export const StyledReturnButton = styled(StyledButton).attrs(() => ({
  outline: true,
  color: 'primary',
}))`
  @media ${props => props.theme.mediaQueries.xs} {
    flex: 1;
  }
`

export const StyledConfirmButton = styled(StyledButton).attrs(() => ({
  color: 'secondary',
  loadingColor: 'white',
}))`
  @media ${props => props.theme.mediaQueries.xs} {
    flex: 1;
  }
`
export const StyledRetryButton = styled(StyledButton).attrs(() => ({
  color: 'secondary',
  loadingColor: 'white',
}))`
  @media ${props => props.theme.mediaQueries.xs} {
    flex: 2;
  }
`

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media ${props => props.theme.mediaQueries.xs} {
    justify-content: space-around;
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
    max-height: max-content;
  }
`

export const ContentContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  @media ${props => props.theme.mediaQueries.lg} {
    padding: 0 ${({ theme }) => theme.spacing(1)}px;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0;
  }
`

export const SummaryContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px 0;
`
