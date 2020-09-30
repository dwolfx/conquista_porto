import React from 'react'
import { createPortal } from 'react-dom'

import * as s from './styles'

interface IProps {
  handleClose: () => void
  isOpen: boolean
  position?: 'bottom' | 'top'
}

const Backdrop: React.FC<IProps> = ({
  children,
  handleClose,
  isOpen,
  position = 'bottom',
  ...rest
}) => {
  return isOpen
    ? createPortal(
        <s.Container {...rest}>
          <s.Overlay id="backdrop-overlay" onClick={handleClose} />
          <s.BackdropContainer position={position}>
            {children}
          </s.BackdropContainer>
        </s.Container>,
        document.getElementById('root') as HTMLDivElement
      )
    : null
}

export default Backdrop
