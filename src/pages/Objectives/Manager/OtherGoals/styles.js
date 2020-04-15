import styled from 'styled-components'

import Tag from 'components/Tag'

export const MenuTag = styled(Tag)`
  background: none;
  border: none;
  cursor: pointer;
  height: auto;

  ${props =>
    props.disabled &&
    `
    p {
      color: ${props.theme.colors.gray4};
    }
  `}
`

export const Container = styled.div`
  display: flex;
`

export const EmptyStateContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  p {
    text-align: right;
  }
`
