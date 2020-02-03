/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import {
  CrumbText,
  CrumbCurrentPage,
  Container,
  Icon,
  StyledText,
} from './styles'

const isLastCrumb = length => currentIndex => length === currentIndex + 1

const getCrumbTag = isLast => (isLast ? CrumbCurrentPage : CrumbText)

const crumbList = {
  'cartao-credito': 'Cartão de Crédito',
  'seguro-viagem': 'Seguro de viagem',
  'financiamento-veiculo': 'Financiamento de veículo',
  'consorcio-imovel': 'Consórcio de imóvel',
  'consorcio-veiculo': 'Consórcio de veículo',
  'seguro-vida': 'Seguro de vida',
  'previdencia-privada': 'Previdência privada',
}

export default function Breadcrumb({ crumbs, version, ...props }) {
  if (version === 'new') {
    return (
      <Container>
        {crumbs.map((crumb, index) => {
          const isLast = crumbs.length === index + 1
          return (
            <React.Fragment key={`crumbKey-${index}`}>
              {typeof crumb === 'string' ? (
                <StyledText>
                  {crumb in crumbList ? crumbList[crumb] : crumb}
                </StyledText>
              ) : (
                crumb
              )}
              {!isLast && <Icon name="arrowright2" />}
            </React.Fragment>
          )
        })}
      </Container>
    )
  }

  return (
    <div {...props}>
      {crumbs.map((crumb, index) => {
        const isLast = isLastCrumb(crumbs.length)(index)
        const CrumbTag = getCrumbTag(isLast)
        return (
          <CrumbTag key={`crumbKey-${index}`}>
            {crumb}
            {!isLast && ' » '}
          </CrumbTag>
        )
      })}
    </div>
  )
}

Breadcrumb.defaultProps = {
  crumbs: [],
  version: '',
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string),
  version: PropTypes.string,
}
