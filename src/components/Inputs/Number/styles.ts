import styled, { css } from 'styled-components'

import Text from 'components/Text'
import Button from 'components/Button'
import NewInput from 'components/NewInput'

function checkIfIsLeft(left: boolean) {
  if (left) {
    return css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;`
  }

  return css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;`
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Label = styled.label``

export const LabelText = styled(Text).attrs(({
  bold: true,
  type: "captionUppercase",
  color: "gray5"
}))``

export const InputNumberContainer = styled.div`
  margin-top: ${({theme}) => theme.spacing(1)}px;
  width: 150px;
  height: 56px;

  display: flex;
`

export const StyledInput = styled(NewInput).attrs(({
  type: 'number'
}))`
  flex: 1;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  div {
    border-radius: 0;
    border-bottom: 0;
  }
`

export const ControlButton = styled(Button)<{left?: boolean}>`
  height: 100%;
  width: 35px;
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  background: ${({ theme, disabled }) => disabled
                                        ? theme.colors.gray2
                                        : `linear-gradient(90deg, ${theme.colors.blue4} 0%, ${theme.colors.blue5} 146.43%)`};



  ${({ left = false }) => checkIfIsLeft(left)}

  span {
    padding: 0;
    font-size: 20px;
  }
`
