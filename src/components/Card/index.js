import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
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
  headerEndItem: HeaderEndItem,
  footer,
  ...rest
}) {
  const CardHeaderContent = () => (
    <HorizontalList
      size="small"
      startItems={[<CardTitle>{headerTitle}</CardTitle>]}
      endItems={HeaderEndItem ? [HeaderEndItem] : []}
      css={`
        width: 100%;
        padding: 0;
      `}
    />
  )

  return (
    <CardWrapper hasFooter={!!footer} {...rest}>
      {headerTitle && (
        <CardHeader>
          {headerIcon && (
            <CardIcon>
              <Icon name={headerIcon} color="white" width={21} />
            </CardIcon>
          )}
          <CardHeaderContent />
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
  headerEndItem: null,
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
  headerEndItem: PropTypes.node,
}
