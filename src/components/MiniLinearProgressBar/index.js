import React from 'react'
import PropTypes from 'prop-types'
import { BackgroundBar, ProgressBar } from './style'

const MiniLinearProgressBar = ({ atual = 0, max = 0, color = undefined }) => {
  const progress = Math.floor((atual * 100) / max)

  return (
    <BackgroundBar>
      <ProgressBar progress={progress} color={color} />
    </BackgroundBar>
  )
}

MiniLinearProgressBar.propTypes = {
  atual: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string,
}

MiniLinearProgressBar.defaultProps = {
  color: undefined,
}

export default MiniLinearProgressBar
