import React from 'react'
import { useTransition } from 'react-spring'
import { IToast } from 'hooks/toast'

import Toast from './Toast'
import { Container } from './styles'

interface IToastContainerProps {
  toasts: IToast[]
}

const NewToastContainer: React.FC<IToastContainerProps> = ({ toasts }) => {
  const toastsWithTransitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })
  return (
    <Container>
      {toastsWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>
  )
}

export default NewToastContainer
