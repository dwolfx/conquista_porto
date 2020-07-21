import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'

import { formatMoney } from 'helpers'

import {
  ProductItem,
  ProductItemRow,
  EmptyProductItemRow,
  HorizontalListWithMargin,
  LinearProgressBarContent,
  ErrorText,
} from './styles'

const ProductItemGenerator = (
  productList = {},
  type = 'notImplemented',
  history = () => {},
  onRetry
) => {
  if (type === 'notImplemented') return []

  const { data, hasError, isLoading } = productList
  const atualItemDetail = itemDetail[type]

  return data && data.length > 0
    ? data.map((product, index) => {
        const id = `${type}-${Date.now().toPrecision() + index}`

        return (
          <React.Fragment key={id}>
            <ProductItem>
              <ProductItemRow>
                <Text type="headline">{atualItemDetail.title}</Text>
              </ProductItemRow>
              {atualItemDetail.subTitle(product)}
              {atualItemDetail.bottomLine(
                product,
                history,
                atualItemDetail.title
              )}
            </ProductItem>
          </React.Fragment>
        )
      })
    : [
        <React.Fragment key={`empty-${Math.random()}`}>
          <EmptyProductItem
            atualItemDetail={atualItemDetail}
            hasData={Boolean(data)}
            hasError={hasError}
            isLoading={isLoading}
            onRetry={onRetry}
          />
        </React.Fragment>,
      ]
}

const itemDetail = {
  cartaoCredito: {
    title: 'Cartão de Crédito',
    link: '/cartao-credito/visualizar',
    linkEmpty: '/cartao-credito',
    subTitle: product => (
      <ProductItemRow>
        <Text type="captionUppercase">
          {`FATURA EM ABERTO ${
            product.Fatura.Status ? product.Fatura.Status : ''
          }`}
        </Text>
      </ProductItemRow>
    ),
    bottomLine(product, history) {
      const { link } = this

      const startItems = [
        <Icon width={20} name={product.Bandeira.toLowerCase()} />,
        <Text color="black" type="headline" bold>
          {formatMoney(product.Fatura.Valor)}
        </Text>,
      ]

      const endItems = [
        <ButtonLink
          data-gtm-subname="card credito cartao de credito"
          data-gtm-name="gerenciar"
          data-gtm-type="click"
          data-gtm-clicktype="link"
          onClick={() => {
            history.push(link)
          }}
        >
          GERENCIAR
        </ButtonLink>,
      ]

      return (
        <HorizontalListWithMargin startItems={startItems} endItems={endItems} />
      )
    },
  },
  financiamentoVeiculo: {
    title: 'Financiamento de Veículos',
    subTitle: () => '',
    link: '/financiamento-veiculo/visualizar',
    linkEmpty: '/financiamento-veiculo',
    bottomLine: genericBottomLine,
  },
  consorcioVeiculo: {
    title: 'Consórcio de Veículo',
    subTitle: () => '',
    link: '/consorcio-veiculo/visualizar',
    linkEmpty: '/consorcio-veiculo',
    bottomLine: genericBottomLine,
  },
  consorcioImovel: {
    title: 'Consórcio de Imóvel',
    subTitle: () => '',
    link: '/consorcio-imovel/visualizar',
    linkEmpty: '/consorcio-imovel',
    bottomLine: genericBottomLine,
  },
  seguroVida: {
    title: 'Seguro de Vida',
    subTitle: () => (
      <ProductItemRow>
        <Text type="captionUppercase">Cobertura principal</Text>
      </ProductItemRow>
    ),
    link: '/seguro-vida/visualizar',
    linkEmpty: '/seguro-vida',
    bottomLine: lifeInsuranceBottomLine,
  },
  seguroViagem: {
    title: 'Seguro Viagem',
    subTitle: () => (
      <ProductItemRow>
        <Text type="captionUppercase">Cobertura principal</Text>
      </ProductItemRow>
    ),
    link: '/seguro-viagem/visualizar',
    linkEmpty: '/seguro-viagem',
    bottomLine: tripInsuranceBottomLine,
  },
}

function lifeInsuranceBottomLine(product, history) {
  const { link } = this

  let value = ''

  try {
    value = product.GruposCobertura[0].CoberturasRisco.filter(
      item => item.Nome === 'Morte'
    )

    value = value.length > 0 ? value[0].CapitalSegurado : ''
  } catch (error) {
    value = ''
  }

  const startItems = [
    <Text color="black" type="headline" bold>
      {formatMoney(value)}
    </Text>,
  ]

  const endItems = [
    <ButtonLink
      data-gtm-subname="card seguros seguro de vida"
      data-gtm-name="gerenciar"
      data-gtm-type="click"
      data-gtm-clicktype="link"
      onClick={() => {
        history.push(link)
      }}
    >
      GERENCIAR
    </ButtonLink>,
  ]

  return (
    <HorizontalListWithMargin startItems={startItems} endItems={endItems} />
  )
}

function tripInsuranceBottomLine(product, history) {
  const { link } = this

  let value

  try {
    value = product.CoberturasBasicas.filter(
      item => item.Nome === 'MORTE ACIDENTAL'
    )

    value = value.length > 0 ? value[0].CapitalSegurado : ''
  } catch (error) {
    value = ''
  }

  const startItems = [
    <Text color="black" type="headline" bold>
      {formatMoney(value)}
    </Text>,
  ]

  const endItems = [
    <ButtonLink
      data-gtm-subname="card seguros seguro viagem"
      data-gtm-name="gerenciar"
      data-gtm-type="click"
      data-gtm-clicktype="link"
      onClick={() => {
        history.push(link)
      }}
    >
      GERENCIAR
    </ButtonLink>,
  ]

  return (
    <HorizontalListWithMargin startItems={startItems} endItems={endItems} />
  )
}

function genericBottomLine(product, history, itemTitle) {
  const { link } = this

  const startItems = [
    <LinearProgressBarContent>
      <MiniLinearProgressBar
        atual={product.QuantidadeParcelasPagas}
        max={product.QuantidadeParcelasContratadas}
      />
    </LinearProgressBarContent>,
    <Text color="black" type="headline" bold>
      {`${product.QuantidadeParcelasPagas}/${product.QuantidadeParcelasContratadas}`}
    </Text>,
  ]

  const endItems = [
    <ButtonLink
      data-gtm-subname={`card credito ${itemTitle}`}
      data-gtm-name="gerenciar"
      data-gtm-type="click"
      data-gtm-clicktype="link"
      onClick={() => {
        history.push(link)
      }}
    >
      GERENCIAR
    </ButtonLink>,
  ]

  return (
    <HorizontalListWithMargin startItems={startItems} endItems={endItems} />
  )
}

const EmptyProductItem = ({
  atualItemDetail,
  hasData,
  hasError,
  isLoading,
  onRetry,
}) => {
  const history = useHistory()
  const cardTitle = atualItemDetail.title.toLowerCase().includes('seguro')
    ? 'seguros'
    : 'credito'

  const EndItems = () => {
    if (isLoading && !hasData) {
      return <Loading />
    }

    if (hasError && !hasData) {
      return (
        <Icon
          name="reload"
          color="blue4"
          css={`
            cursor: pointer;
          `}
          onClick={() => {
            if (onRetry) {
              onRetry()
            }
          }}
        />
      )
    }

    return (
      <Button
        data-gtm-subname={`card ${cardTitle} ${atualItemDetail.title}`}
        data-gtm-name="conheca"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="secondary"
        onClick={() => history.push(atualItemDetail.linkEmpty)}
      >
        CONHECER
      </Button>
    )
  }

  return (
    <EmptyProductItemRow>
      <HorizontalListWithMargin
        startItems={[
          <Text type="headline" color="gray5">
            {atualItemDetail.title}
            {hasError && !hasData && <ErrorText>Falha ao carregar</ErrorText>}
          </Text>,
        ]}
        endItems={[<EndItems />]}
      />
    </EmptyProductItemRow>
  )
}

EmptyProductItem.propTypes = {
  atualItemDetail: PropTypes.object.isRequired,
  hasData: PropTypes.bool,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
  onRetry: PropTypes.func,
}

EmptyProductItem.defaultProps = {
  hasData: false,
  hasError: false,
  isLoading: false,
  onRetry: null,
}

export default ProductItemGenerator
