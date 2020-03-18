import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Loading from 'components/Loading'
import Icon from 'components/IconExporter'

export default function CardHeaderState({
  data,
  isLoading,
  hasError,
  onErrorClick,
}) {
  let dataExists = false

  if (data) {
    if (Array.isArray(data)) {
      dataExists = data.reduce((acc, cur) => acc && cur.length !== 0, true)
    } else {
      // object
      dataExists = Object.entries(data).length !== 0
    }
  }

  if (isLoading && dataExists) {
    return <Loading />
  }

  if (hasError && data && Object.entries(data).length !== 0) {
    return (
      <Icon
        name="reload"
        color="blue4"
        css={`
          cursor: pointer;
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
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  onErrorClick: PropTypes.func,
}

CardHeaderState.defaultProps = {
  data: null,
  isLoading: false,
  hasError: false,
  onErrorClick: null,
}
