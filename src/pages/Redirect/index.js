import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button/Link'
import {
  Background,
  LogoConquista,
  Card,
  Text,
  LogoPorto,
  Line,
  GridContainer,
  GridRow,
  GridCol,
} from './styles'

/**
 * ### HOW TO USE ###
 * The button which will navigate to Redirect page must have the following 'to' param:
 *  <Link to={{
 *    pathname: "/redirect",
 *    state: {url: "https://www.yourUrlToRedirect.com.br"}
 *  }}>Click me</Link>
 */

export default function Redirect(props) {
  const [counter, setCounter] = useState(5)

  function navigate() {
    if (props.history.location.state && props.history.location.state.url) {
      window.location.replace(props.history.location.state.url)
    } else {
      window.location.replace('https://www.portoseguro.com.br')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevState => (prevState <= 0 ? 0 : prevState - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (counter <= 0) navigate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  return (
    <Background>
      <GridContainer>
        <GridRow>
          <GridCol xl={12}>
            <LogoConquista />
            <Card>
              <Text>
                Em {counter} {counter > 1 ? 'segundos' : 'segundo'} você será
                redirecionado para:
              </Text>
              <LogoPorto />
              <Line />
              <Button onClick={navigate}>Redirecionar Agora</Button>
            </Card>
          </GridCol>
        </GridRow>
      </GridContainer>
    </Background>
  )
}

Redirect.propTypes = {
  history: PropTypes.object,
}
Redirect.defaultProps = {
  history: {},
}
