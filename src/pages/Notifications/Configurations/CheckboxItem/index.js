import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'

import { CheckMark, Input, Label } from './styles'

const CheckboxItem = ({ checked, children }) => {
  const [isChecked, setIsChecked] = useState(checked)

  return (
    <Label>
      <Text type="paragraph">{children}</Text>
      <Input
        type="checkbox"
        checked={isChecked}
        onChange={() => (isChecked ? setIsChecked(false) : setIsChecked(true))}
      />
      <CheckMark />
    </Label>
  )
}

export default CheckboxItem

CheckboxItem.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.string,
}
CheckboxItem.defaultProps = {
  checked: false,
  children: '',
}
