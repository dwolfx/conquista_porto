import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  LayerContainer,
  LayerHeader,
  LayerWrapper,
  ChildrenWrapper,
} from './styles'

const Layer = ({
  children,
  headerContent,
  isOpen,
  handleClose,
  alignItems,
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

  useEffect(() => {
    const handler = function handleEscClose(event) {
      if (isOpen && event.keyCode === 27) {
        handleClose(isOpen)
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
    document.querySelector('#root')
  )
}

Layer.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  alignItems: PropTypes.string,
  headerContent: PropTypes.node.isRequired,
}

export default Layer
