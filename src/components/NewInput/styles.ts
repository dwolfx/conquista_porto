import styled, { css } from 'styled-components'
import Icon from 'components/IconExporter'

interface InputGroupWrapperInterface {
  noBorderRadius: boolean
}

const inputDefaultStyle = css`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  display: flex;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing(1)}px`};

  #prefix {
    padding-left: ${({ theme }) => `${theme.spacing(1)}px`};
  }
  #suffix {
    padding-right: ${({ theme }) => `${theme.spacing(1)}px`};
  }
  :focus-within {
    border-bottom: 2px solid ${props => props.theme.colors.blue4};
    #prefix,
    #suffix {
      color: ${props => props.theme.colors.gray6};
    }
  }
`

const inputErrorStyle = css`
  border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  color: ${props => props.theme.colors.magenta2};
  :focus-within {
    border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  }
`

export const InputGroupWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 8px 8px 0px 0px;
  height: 100%;
  ${props => props.theme.fontTypes.headline};
`

interface IInputWrapperProps {
  error?: boolean | { icon: string; message: string }
  width?: string | number
}

export const InputWrapper = styled.div<IInputWrapperProps>`
  ${inputDefaultStyle}
  ${props => props.error && inputErrorStyle}
  position: relative;
`

export const InputLabel = styled.label`
  color: ${props => props.theme.colors.gray5};
  padding-left: ${({ theme }) => `${theme.spacing(2)}px`};
  padding-top: ${({ theme }) => `${theme.spacing(1)}px`};
  ${props => props.theme.fontTypes.captionUppercase};
`

export const InputAddon = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.gray4};
  display: flex;
  font: inherit;
  height: 100%;
`

export const ErrorMessage = styled.span`
  align-items: center;
  bottom: 0;
  color: ${props => props.theme.colors.magenta2};
  display: flex;
  margin: ${props => props.theme.spacing(2)}px
    ${props => props.theme.spacing(2)}px 0;
  width: 100%;
`

export const ErrorIcon = styled(Icon)`
  fill: ${props => props.theme.colors.magenta2};
  margin-right: 7px;
`

export const Input = styled.input`
  background-color: inherit;
  border: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray4 : theme.colors.gray6};
  font: inherit;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing(1)}px`};
  width: 100%;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.gray1} inset;
  }

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray4};
    font-weight: normal;
    ${({ theme }) => theme.fontTypes.headline};
  }
`

interface IGroup {
  disabled?: boolean
  hasLabel: boolean
  size?: 'sm' | 'default'
}

export const InputFieldGroup = styled.div<IGroup>`
  position: relative;
  height: ${({ hasLabel, size }) => {
    if (size === 'sm') {
      return '35px'
    }
    if (hasLabel) {
      return '70px'
    }

    return '56px'
  }};

  ${InputWrapper} {
    height: ${({ hasLabel }) => {
      if (hasLabel) {
        return 'calc(100% - 24px)'
      }

      return '100%'
    }};
  }
  ${({ disabled }) =>
    disabled
      ? `
  &:before {
    content: '';
    cursor: not-allowed;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  &:after {
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    pointer-events: none;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  `
      : ''}
`
