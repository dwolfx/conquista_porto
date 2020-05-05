import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'
import Card from 'components/Card'
import Text from 'components/Text'

export const GridRow = styled(Row)`
  margin-bottom: ${props => props.theme.spacing(6)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: ${props => props.theme.spacing(2)}px;
  }
`

export const FullHeightCard = styled(Card)``

export const CardRow = styled(Row)`
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
  margin: 0;
  text-align: center;

  &:not(:first-of-type) {
    margin-top: ${props => props.theme.spacing(5)}px;
  }

  &:last-of-type {
    margin: ${({theme}) => `${theme.spacing(5)}px auto 0`};
    max-width: 770px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    text-align: left;
  }
`

export const BodyCard = styled.div`
  padding: ${({theme}) => `${theme.spacing(5)}px 0 ${theme.spacing(3)}px`};

  @media ${props => props.theme.mediaQueries.sm} {
    padding: ${({theme}) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
  }
`

export const LabelIncome = styled(Col)`
  background-color: ${props => props.theme.colors.gray1};
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: ${props => props.theme.spacing(1)}px;
  min-width: 175px;
  padding: ${props => props.theme.spacing(2)}px;
  text-align: center;

  &:nth-child(2) {
    background-color: ${props => props.theme.colors.green1};
    border: 1px solid ${props => props.theme.colors.green3};
  }

  @media ${props => props.theme.mediaQueries.sm} {
    margin-top: ${props => props.theme.spacing(4)}px;
    width: 100%;
  }
`

export const LabelObjective = styled(Col)`
  margin: ${({theme}) => `0 ${theme.spacing(3)}px`};

  @media ${props => props.theme.mediaQueries.md} {
    margin: ${({theme}) => `0 ${theme.spacing(2)}px`};
  }

  @media ${props => props.theme.mediaQueries.sm} {
    margin: 0;
    text-align: center;
    width: 50%;
  }
`

export const FeaturedText = styled(Text).attrs(() => ({ type: 'headline' }))`
  margin-top: ${props => props.theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: ${props => props.theme.spacing(5)}px;
  }
`

export const Divider = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  height: 0%;
  max-width: 770px;
  width: 100%;
  margin: ${({theme}) => `${theme.spacing(5)}px auto 0`};

  @media ${props => props.theme.mediaQueries.sm} {
    margin: 0;
  }
`