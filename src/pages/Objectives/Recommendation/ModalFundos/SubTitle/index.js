import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/IconExporter'
import { ThemeContext } from 'styled-components'
import { SubTitle, Title } from './styles'

const SubTitleModal = ({ icon, title }) => {
  const themeContext = useContext(ThemeContext)
  return (
    <SubTitle>
      {icon && (
        <Icon
          width="25"
          fill={themeContext.colors.gray6}
          name={icon}
          padding-right="14"
        />
      )}
      <Title>{title}</Title>
    </SubTitle>
  )
}

SubTitleModal.defaultProps = {
  icon: '',
}

SubTitleModal.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

export default SubTitleModal
