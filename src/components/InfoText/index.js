import React from 'react'
import PropTypes from 'prop-types'

import Text from 'components/Text'

export default function InfoText({ label, value }) {
  return (
    <>
      <Text type="captionUppercase" color="gray4">
        {label}
      </Text>
      <Text type="headline" color="gray6" bold>
        {value}
      </Text>
    </>
  )
}

InfoText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
}

InfoText.defaultProps = {
  value: '',
}
