/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/Inputs/Text'

const CEPInput = ({ onKeyUp, ...props }) => {
  const [error] = useState(false)

  const searchCEP = async cep => {
    let infos = { error: true }
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
      method: 'GET',
    }

    if (cep) {
      infos = await fetch(url, options).then(res => res.json())
    }

    return infos
  }

  const applyCEPMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue

    newValue = strippedValue.replace(/(\d{5})(\d{1})/g, '$1-$2')

    event.target.value = newValue

    if (strippedValue.length === 8) {
      searchCEP(strippedValue).then(res => console.log(res))
    }

    if (onKeyUp) {
      onKeyUp()
    }
  }

  return (
    <TextInput maxLength="9" onKeyUp={applyCEPMask} error={error} {...props} />
  )
}

CEPInput.defaultProps = {
  onKeyUp: null,
}

CEPInput.propTypes = {
  onKeyUp: PropTypes.func,
}

export default CEPInput
