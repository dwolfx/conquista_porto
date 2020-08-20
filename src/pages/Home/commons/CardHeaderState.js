import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Loading from 'components/Loading'
import Icon from 'components/IconExporter'

export default function CardHeaderState({
  showHeader,
  isLoading,
  hasError,
  onErrorClick,
}) {
  if (isLoading && showHeader) {
    return <Loading />
  }

  if (hasError && showHeader) {
    return (
      <Icon
        name="reload"
        color="blue4"
        css={`
          cursor: pointer;
          width: 21px;
        `}
        onClick={() => {
          if (onErrorClick) {
            onErrorClick()
          }
        }}
      />
    )
  }

  return null
}

CardHeaderState.propTypes = {
  showHeader: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  onErrorClick: PropTypes.func,
}

CardHeaderState.defaultProps = {
  showHeader: false,
  isLoading: false,
  hasError: false,
  onErrorClick: null,
}
