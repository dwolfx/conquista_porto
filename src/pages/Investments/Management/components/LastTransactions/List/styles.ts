import styled from 'styled-components'

export const Container = styled.div``

export const ListItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
