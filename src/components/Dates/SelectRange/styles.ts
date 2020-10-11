import styled from 'styled-components'

export const DropdownLineContent = styled.div`
  padding: 12px;
  text-align: right;
  width: 100%;
  cursor: pointer;
`
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  div {
    padding-right: ${({ theme }) => theme.spacing(1)}px;
  }
  .icon {
    padding-top: 2px;
  }
`
