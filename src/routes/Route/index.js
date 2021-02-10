import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import googleTagManagerHandler from 'GoogleTagManager'
import { Route as ReactRouterDomRoute, useHistory } from 'react-router-dom'

const Route = ({ path, component, pageTitle, isFinalComponent, ...rest }) => {
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const points = useSelector(
    state => state.points.data && state.points.data.detalheExtratoOptemaisTypes
  )

  useEffect(() => {
    const pathName = history.location.pathname
    const splitName = pathName.split('/')
    let title = pageTitle

    if (pathName.includes('objetivos') && splitName.length > 2) {
      title = `${pageTitle} - ${splitName.slice(-1)}`
    }

    if (isFinalComponent) {
      googleTagManagerHandler(history.location.pathname, title, auth, points)
    }
  }, [history.location.pathname, pageTitle, auth, points, isFinalComponent])
  return (
    <ReactRouterDomRoute
      {...rest}
      path={path}
      exact={rest.exact}
      component={component}
      pageTitle={pageTitle}
    />
  )
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func,
  pageTitle: PropTypes.string.isRequired,
  isFinalComponent: PropTypes.bool,
}

Route.defaultProps = {
  component: null,
  isFinalComponent: true,
}

export default Route
