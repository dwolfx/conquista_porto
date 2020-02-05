import React from 'react'
import PropTypes from 'prop-types'
import { BackgroundBar, ProgressBar } from './style'

const MiniLinearProgressBar = ({ atual, max, color }) => {
  const maxNum = parseInt(max, 10)
  const atualNum = parseInt(atual, 10)
  const progress = Math.floor((atualNum * 100) / maxNum)

  return (
    <BackgroundBar>
      <ProgressBar progress={progress} color={color} />
    </BackgroundBar>
  )
}

MiniLinearProgressBar.propTypes = {
  atual: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string,
}

MiniLinearProgressBar.defaultProps = {
  color: undefined,
}

export default MiniLinearProgressBar
