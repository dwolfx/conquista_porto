import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import { Row, Col } from 'styled-bootstrap-grid'

const ButtonNext = ({ changeScreen, ...props }) => (
  <Row justifyContent="center">
    <Col lgAuto xs={12}>
      <Button color="primary" onClick={changeScreen}>
        {props.title}
      </Button>
    </Col>
  </Row>
)

ButtonNext.defaultProps = {
  changeScreen: null,
  title: 'Continuar',
}

ButtonNext.propTypes = {
  changeScreen: PropTypes.func,
  title: PropTypes.string,
}

export default ButtonNext
