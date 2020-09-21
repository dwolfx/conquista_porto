import styled from 'styled-components'

import Button from 'components/Button'
import Text from 'components/Text'


export const ObjectivesListContainer = styled.div`
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const EmptyBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const EmptyText = styled(Text)`
  color: ${props => props.theme.colors.gray5};
  text-align: center;
  width: 314px;
`

export const EmptyButton = styled(Button)`
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  min-width: 0;
`