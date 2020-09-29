import styled from 'styled-components'
import CardCmp from 'components/Card'

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
