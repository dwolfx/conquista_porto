import styled from 'styled-components'

import Text from 'components/Text'
import PopoverCmp from 'components/Popover'

export const Container = styled.div`
  position: relative;
`

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

  input {
      text-transform: capitalize;
  }
`

export const OptionsWrapper = styled.div<{
  optionBoxDirection: 'top' | 'bottom'
  optionBoxSize: number
}>`
  position: absolute;
  width: 100%;
  z-index: 14;
  box-shadow: ${({ theme }) => theme.shadows.gray2};
  max-height: ${({ optionBoxSize }) => `${optionBoxSize}px`};
  padding: ${({ theme }) => `${theme.spacing(2)}px 0`};
  overflow-y: auto;
  ${({ optionBoxDirection, theme }) =>
    optionBoxDirection === 'top'
      ? `bottom: ${theme.spacing(10)}px`
      : `top: ${theme.spacing(10)}px`};
`

interface IOptionsItem {
  selected?: boolean
}

export const OptionsItem = styled.div<IOptionsItem>`
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.gray1 : theme.colors.white};
  cursor: pointer;
  display: flex;
  height: 49px;
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
<<<<<<< HEAD
  text-transform: capitalize;
=======
>>>>>>> d21df399 ([PVEV-888] - add redeem action/integration)

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
  svg {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }
`
<<<<<<< HEAD

export const Overlay = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`

export const TooltipText = styled(Text)`
  width: 213px;
` 

export const Popover = styled(PopoverCmp)`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(4)}px 0 ${({ theme }) => theme.spacing(4)}px 0 ;
`
=======
>>>>>>> d21df399 ([PVEV-888] - add redeem action/integration)
