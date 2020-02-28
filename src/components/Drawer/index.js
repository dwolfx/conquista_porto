import React from 'react'
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
} from './styles'

const Drawer = ({
  children,
  footer,
  handleClose,
  isOpen,
  drawerTitle,
  positionDrawer,
  ...rest
}) =>
  ReactDOM.createPortal(
    <DrawerOverlay isOpen={isOpen} positionDrawer={positionDrawer} {...rest}>
      <DrawerWrapper>
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
      </DrawerWrapper>
    </DrawerOverlay>,
    document.querySelector('#root')
  )

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
