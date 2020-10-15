/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Crumbcontainer, Container, Icon, StyledText } from './styles'

const crumbList = {
  'cartao-credito': 'Cartão de Crédito',
  'seguro-viagem': 'Seguro de viagem',
  'financiamento-veiculo': 'Financiamento de veículo',
  'consorcio-imovel': 'Consórcio de imóvel',
  'consorcio-veiculo': 'Consórcio de veículo',
  'seguro-vida': 'Seguro de vida',
  'previdencia-privada': 'Previdência privada',
}

export default function Breadcrumb({ crumbs }) {
  const history = useHistory()

  const gtmAttrs = crumb => ({
    'data-gtm-type': 'click',
    'data-gtm-clicktype': 'link',
    'data-gtm-subname': 'header',
    'data-gtm-name': `${crumb in crumbList ? crumbList[crumb] : crumb}`,
  })

  const handleBreadcrumbLink = index => {
    const crumbPath = [...crumbs].slice(0, index + 1).join('/')
    const path = history.location.pathname

    if (crumbPath === 'objetivos/gerenciar') {
      history.push({ pathname: '/', state: { scrollGoal: true } })
    } else if (path !== `/${crumbPath}`) {
      history.push(`/${crumbPath}`)
    }
  }

  return (
    <Container>
      {crumbs.map((crumb, index) => {
        const isLast = crumbs.length === index + 1

        return (
          <React.Fragment key={`crumbKey-${index}`}>
            {typeof crumb === 'string' ? (
              <Crumbcontainer
                cursorStyle={!isLast ? 'pointer' : 'auto'}
                {...(!isLast ? gtmAttrs(crumb) : null)}
                onClick={() => (!isLast ? handleBreadcrumbLink(index) : null)}
              >
                <StyledText>
                  {crumb in crumbList ? crumbList[crumb] : crumb}
                </StyledText>
              </Crumbcontainer>
            ) : (
              crumb
            )}
            {!isLast && <Icon name="arrowright" color="gray6" />}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

Breadcrumb.defaultProps = {
  crumbs: [],
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string),
}
