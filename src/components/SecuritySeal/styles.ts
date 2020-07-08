import styled from 'styled-components'

import Text from 'components/Text'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  height: 63px;
  width: 168px;
`

export const StyledText = styled(Text)`
  text-transform: uppercase;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`
