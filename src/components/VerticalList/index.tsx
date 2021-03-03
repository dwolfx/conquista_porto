import React from 'react'
import PropTypes from 'prop-types'

import { Container, ListElements } from './styles'

interface IProps {
  elements: React.ReactNode[]
  noSpacing?: boolean
  marginBetweenElements?: number
  customContainerPadding?: string | number
}
export default function VerticalList({ elements, marginBetweenElements = 7, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <ListElements marginBetweenElements={marginBetweenElements}>
        {elements &&
          elements.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </ListElements>
    </Container>
  )
}

VerticalList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.node).isRequired,
}
