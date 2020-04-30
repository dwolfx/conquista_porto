import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  ModalContainer,
  ModalHeader,
  ModalWrapper,
  ChildrenWrapper,
} from './stylesNew'

const Layer = ({
  children,
  headerContent,
  isOpen,
  handleClose,
  alignItems,
  maxWidth,
  fullScreen,
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

  const classNames = `${fullScreen ? 'fullScreen' : ''}`

  return ReactDOM.createPortal(
    <ModalWrapper isOpen={isOpen} alignItems={alignItems} {...rest}>
      <ModalContainer maxWidth={maxWidth} className={classNames}>
        <ModalHeader className="layer-header">{headerContent}</ModalHeader>
        <ChildrenWrapper className="layer-children-wrapper">
          {children}
        </ChildrenWrapper>
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector('#root')
  )
}

Layer.defaultProps = {
  maxWidth: '900px',
  fullScreen: false,
}

Layer.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  alignItems: PropTypes.string,
  maxWidth: PropTypes.string,
  fullScreen: PropTypes.bool,
  headerContent: PropTypes.node.isRequired,
}

export default Layer
