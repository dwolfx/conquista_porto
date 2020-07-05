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
 * The button which will navigate to Redirect page must have the following 'to' param with the url as query param:
 *  <Link
 *    target="_blank"
 *    to={{
 *      pathname: `/redirect?to=https://www.yourUrlToRedirect.com.br`,
 *    }}
 *    data-gtm-type="click"
 *    data-gtm-clicktype="link"
 *    data-gtm-subname="container_name"
 *    data-gtm-name="button_name"
 *  >Click me</Link>
 */

export default function Redirect({ history }) {
  const [counter, setCounter] = useState(5)

  const urlToGo = history.location.search.substr(4)

  function navigate() {
    if (urlToGo) {
      window.open(urlToGo, '_self')
    } else {
      window.open('https://www.portoseguro.com.br', '_self')
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
    // eslint-disable-next-line
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
              <Button
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname="voce sera redirecionado para"
                data-gtm-name="redirecionar agora"
                onClick={navigate}
              >
                Redirecionar Agora
              </Button>
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
