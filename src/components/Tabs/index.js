import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from './styles'

export default function TabComponent({ children, ...props }) {
  return <Tab {...props}>{children}</Tab>
}

TabComponent.propTypes = {
  children: PropTypes.string.isRequired,
}
