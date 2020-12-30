import styled from 'styled-components'
import CardCmp from 'components/Card'
import Text from 'components/Text'

export const Card = styled(CardCmp)`
  height: 100%;
`
export const ObjectivePercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
export const ObjectivePercentageText = styled(Text)`
  min-width: 44px;
`
