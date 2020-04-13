import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  CloseButton,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerWrapper,
  DrawerContent,
} from './styles'

const Drawer = ({
  children,
  footer,
  handleClose,
  isOpen,
  drawerTitle,
  positionDrawer,
  ...rest
}) => {
  useEffect(() => {
    const body = document.querySelector('body')
    const html = document.querySelector('html')
    if (isOpen) {
      body.style.overflow = 'hidden'
      html.style.overflowY = 'hidden'
    }

    function handleOverflow() {
      body.style.overflow = 'visible'
      html.style.overflowY = 'visible'
    }
    return () => handleOverflow()
  }, [isOpen])

  return ReactDOM.createPortal(
    <DrawerWrapper>
      <DrawerOverlay isOpen={isOpen} onClick={handleClose} />
      <DrawerContent positionDrawer={positionDrawer} isOpen={isOpen} {...rest}>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <CloseButton
            data-gtm-subname={`menu ${drawerTitle}`}
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={handleClose}
          />
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerWrapper>,
    document.querySelector('#root')
  )
}

Drawer.defaultProps = {
  drawerTitle: '',
  footer: null,
  positionDrawer: 'right',
}

Drawer.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  drawerTitle: PropTypes.string,
  positionDrawer: PropTypes.string,
}

export default Drawer
