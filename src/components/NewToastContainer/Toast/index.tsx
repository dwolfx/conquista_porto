import React, { useEffect } from 'react'

import Text from 'components/Text'
import { IToast, useToast } from 'hooks/toast'
import { Container, IconStyled, CloseToastIconButton } from './styles'

interface ToastProps {
  toast: IToast
  style: object
}

const icons = {
  error: <IconStyled name="closerounded" color="magenta2" />,
  success: <IconStyled name="check" color="green3" />,
}

const Toast: React.FC<ToastProps> = ({ toast, ...rest }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <Container key={toast.id} type={toast.type} {...rest}>
      {icons[toast.type] || icons.success}
      <div>
        <Text type="title" color="gray6">
          {toast.title || 'NO TITLE WAS PROVIDED'}
        </Text>
        {toast?.description ? (
          <Text
            color="gray5"
            css={`
              margin-top: 7px;
            `}
          >
            {toast.description}
          </Text>
        ) : null}
      </div>

      <CloseToastIconButton
        name="close"
        color="gray5"
        onClick={() => removeToast(toast.id)}
      />
    </Container>
  )
}

export default Toast
