import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import {
  LayerContainer,
  LayerHeader,
  LayerWrapper,
  ChildrenWrapper,
} from './styles'

interface IProps {
  headerContent: React.ReactNode
  isOpen: boolean
  handleClose: () => void
  alignItems?: string
}

const Layer: React.FC<IProps> = ({
  children,
  headerContent,
  isOpen,
  handleClose,
  alignItems = '',
  ...rest
}) => {
  useEffect(() => {
    const body = document.querySelector<HTMLInputElement>('body')
    const html = document.querySelector<HTMLInputElement>('html')
    if (isOpen) {
      body!.style.overflow = 'hidden'
      html!.style.overflowY = 'hidden'
    }

    function handleOverflow() {
      body!.style.overflow = 'visible'
      html!.style.overflowY = 'visible'
    }
    return () => handleOverflow()
    // add children to dependecy to garantee that, while the layer is opened, the html/body overflow will be hidden, so the scroll will only be on the layer, not also on the document
  }, [isOpen, children])

  useEffect(() => {
    const handler = function handleEscClose(event: KeyboardEvent) {
      if (isOpen && event.keyCode === 27) {
        handleClose()
      }
    }

    window.addEventListener('keyup', handler)

    return () => window.removeEventListener('keyup', handler)
  }, [handleClose, isOpen])

  return ReactDOM.createPortal(
    <LayerWrapper isOpen={isOpen} alignItems={alignItems} {...rest}>
      <LayerContainer>
        <LayerHeader>{headerContent}</LayerHeader>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </LayerContainer>
    </LayerWrapper>,
    document.querySelector('#root') as HTMLInputElement
  )
}

export default Layer
