import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;

  &:after {
    content: '';
    cursor: pointer;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export const OptionsWrapper = styled.div`
  position: absolute;
  top: ${({theme}) => theme.spacing(10)}px;
  width: 100%;
  z-index: 14;
  box-shadow: ${({ theme }) => theme.shadows.gray2};
  max-height: 400px;
  padding: ${({ theme }) => `${theme.spacing(2)}px 0`};
  overflow-y: auto;
`

interface IOptionsItem {
  selected: boolean
}

export const OptionsItem = styled.div<IOptionsItem>`
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.gray1 : theme.colors.white};
  cursor: pointer;
  display: flex;
  height: 49px;
  padding: 0 ${({ theme }) => theme.spacing(3)}px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
  svg {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }
`
