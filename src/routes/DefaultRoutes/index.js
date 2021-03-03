import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Loading from 'components/Loading'

import Route from '../Route'

import { LoadingContainer } from './styles'

const DefaultRoute = ({
  component: Component,
  computedMatch: match,
  data,
  hook,
  name,
  pageTitle,
  ...rest
}) => {
  let dataLength = 0

  try {
    if (!data) {
      hook()

      // while the hook is being called, dont render anything (eliminates blink between screens)
      return (
        <LoadingContainer>
          <Loading type="bar" />
        </LoadingContainer>
      )
    }

    dataLength = Array.isArray(data) ? data.length : Object.entries(data).length
  } catch (error) {
    dataLength = 0
  }

  const crumbs = match.path
    .split('/')
    .slice(1)
    .map(pathString => {
      if (Object.keys(match.params).includes(pathString.replace(':', ''))) {
        return name || pageTitle
      }
      if (pathString === 'lista-fundos') {
        return 'lista de fundos'
      }
      return pathString
    })

  return (
    <>
      <Header crumbs={crumbs} />
      <main className="main-content">
        <Route
          {...rest}
          computedMatch={match}
          pageTitle={pageTitle}
          isFinalComponent={Boolean(!dataLength)}
          render={props => {
            // if dataLength !== 0, data exists therefore redirects to management screen
            if (dataLength) {
              return <Redirect to={{ pathname: `${rest.path}/visualizar` }} />
            }
            // otherwise, renders the component
            return <Component {...props} />
          }}
        />
      </main>
      <Footer />
    </>
  )
}

DefaultRoute.propTypes = {
  hook: PropTypes.func,
  name: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  component: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  computedMatch: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.object,
  }),
}

DefaultRoute.defaultProps = {
  computedMatch: {},
  data: [],
  hook: () => {},
  name: '',
}

export default DefaultRoute
