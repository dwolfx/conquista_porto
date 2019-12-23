import styled from 'styled-components'

import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'
import Text from 'components/Text'

export const CardObjective = styled(Card)`
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
`

export const InfosBox = styled.div`
  display: flex;
  justify-content: space-between;
`

export const OfferTitle = styled(Text).attrs({ type: 'title5', bold: true })`
  color: ${props => props.theme.colors.gray5};
  flex: 1;
  margin-right: 18px;
`
