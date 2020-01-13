import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import { Row, Col } from 'styled-bootstrap-grid'

const ButtonNext = ({ handleScreen, ...props }) => (
  <Row justifyContent="center">
    <Col lgAuto xs={12}>
      <Button color="primary" onClick={handleScreen}>
        {props.title}
      </Button>
    </Col>
  </Row>
)

ButtonNext.defaultProps = {
  handleScreen: null,
  title: 'Continuar',
}

ButtonNext.propTypes = {
  handleScreen: PropTypes.func,
  title: PropTypes.string,
}

export default ButtonNext
