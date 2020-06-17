import styled from 'styled-components'

import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'
import Text from 'components/Text'

export const CardObjective = styled(Card)`
  cursor: pointer;
  padding: 0 21px;
  ${CardBody} {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

export const IconWrapper = styled.div`
  height: 70px;
  margin-bottom: 22px;

  svg {
    fill: ${props => props.theme.colors.gray4};
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.sm} {
    height: 45px;
  }
`

export const InfosBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OfferTitle = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${props => props.theme.colors.gray5};
  flex: 1;
  padding-right: 10px;
  margin-right: 20px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-right: 0;
  }
`
