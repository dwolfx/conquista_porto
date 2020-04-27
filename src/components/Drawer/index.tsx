import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

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

interface IProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  handleClose?: () => any
  isOpen: boolean
  drawerTitle?: string
  positionDrawer?: string
}

const Drawer: React.FC<IProps> = ({
  children,
  header,
  footer,
  handleClose,
  isOpen,
  drawerTitle,
  positionDrawer = 'right',
  ...rest
}) => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    const html = document.querySelector('html') as HTMLHtmlElement

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
          {header || (
            <>
              <DrawerTitle>{drawerTitle}</DrawerTitle>
              <CloseButton
                data-gtm-subname={`menu ${drawerTitle}`}
                data-gtm-name="botao fechar"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                onClick={handleClose}
              />
            </>
          )}
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerWrapper>,
    document.querySelector('#root') as HTMLDivElement
  )
}

export default Drawer
