import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(1)}px
    ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  white-space: nowrap;
  align-items: flex-start;
`
export const DropdownWrapper = styled.div`
  display: flex;
  width: fit-content;
  margin-right: ${({ theme }) => theme.spacing(4)}px;
`
export const DropdownLineContent = styled.div`
  padding: 12px;
  width: 100%;
  cursor: pointer;
`

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  div {
    padding-left: ${({ theme }) => theme.spacing(1)}px;
  }
  .icon {
    padding-top: 2px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  > button {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
    &:last-child : {
      margin: 0;
    }
  }
`
