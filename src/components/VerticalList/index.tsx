import React from 'react'
import PropTypes from 'prop-types'

import { Container, ListElements } from './styles'

interface IProps {
  elements: React.ReactNode[]
}
export default function VerticalList({ elements, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <ListElements>
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
