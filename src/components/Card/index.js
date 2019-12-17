/* eslint-disable global-require */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'

import {
  CardWrapper,
  CardHeader,
  CardBody,
  CardFooter,
  CardIcon,
  CardTitle,
} from './styles'

export default function Card({
  children,
  headerIcon,
  headerTitle,
  footer,
  ...rest
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <CardWrapper hasFooter={!!footer} {...rest}>
      {headerTitle && (
        <CardHeader>
          {headerIcon && (
            <CardIcon>
              <Icon name={headerIcon} fill={themeContext.colors.white} />
            </CardIcon>
          )}
          <CardTitle>{headerTitle}</CardTitle>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardWrapper>
  )
}

Card.defaultProps = {
  headerIcon: null,
  headerTitle: null,
  footer: null,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  headerIcon: (props, propName) => {
    // if headerTitle exist, headerIcon is required AND it must be of type string
    if (
      !!props.headerTitle &&
      (props[propName] === 'undefined' || typeof props[propName] !== 'string')
    ) {
      return new Error('headerIcon is required.')
    }

    return null
  },
  headerTitle: PropTypes.string,
  footer: PropTypes.node,
}
