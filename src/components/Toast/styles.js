import styled from 'styled-components'
import { ToastContainer as ToastifyContainer } from 'react-toastify'

export const ToastContainer = styled(ToastifyContainer)`
  &.Toast__container {
    .Toastify__toast--info {
      background: ${props => props.theme.colors.blue4};
    }
    .Toastify__toast--error {
      background: ${props => props.theme.colors.magenta2};
    }
    .Toastify__toast--success {
      background: ${props => props.theme.colors.green3};
    }

    .Toastify__toast {
      ${props => props.theme.fontTypes.body}
      padding: 7px 21px;
      border-radius: 4px;
    }
  }
`
