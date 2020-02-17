import React from 'react'
import PropTypes from 'prop-types'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Button from 'components/Button'
import Icon from 'components/IconExporter'

import { useHistory } from 'react-router-dom'

import { formatMoney } from 'helpers'

import {
  ProductItem,
  ProductItemRow,
  EmptyProductItemRow,
  CreditCardItemRow,
  LinearProgressBarContent,
  TextBlack,
  HorizontalListWithMargin,
} from './styles'

const ProductItemGenerator = (
  productList = [],
  type = 'notImplemented',
  history = () => {}
) => {
  if (type === 'notImplemented') return []

  const atualItemDetail = itemDetail[type]

  return productList && productList.length > 0
    ? productList.map((product, index) => {
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
          <EmptyProductItem atualItemDetail={atualItemDetail} />
        </React.Fragment>,
      ]
}

const itemDetail = {
  cartaoCredito: {
    title: 'Cartão de Crédito',
    link: '/cartao-credito/visualizar',
    linkEmpty: '/cartao-credito',
    subTitle: product => (
      <CreditCardItemRow>
        <Text type="captionUppercase">{`FATURA ${
          product.Fatura.Status ? product.Fatura.Status : ''
        }`}</Text>
      </CreditCardItemRow>
    ),
    bottomLine(product, history) {
      const { link } = this

      const startItems = [
        <Icon width={20} name={product.Bandeira.toLowerCase()} />,
        <TextBlack type="headline" bold>
          {formatMoney(product.Fatura.Valor)}
        </TextBlack>,
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
    value =
      product.GruposCobertura.GrupoCobertura[0].CoberturasRisco
        .CoberturaRisco[1].CapitalSegurado
  } catch (error) {
    value = ''
  }

  const startItems = [
    <TextBlack type="headline" bold>
      {formatMoney(value)}
    </TextBlack>,
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
    value = product.CoberturasBasicas.CoberturaBasica.filter(
      item => item.Nome === 'MORTE ACIDENTAL'
    )

    value = value.length ? value[0] : ''
  } catch (error) {
    value = ''
  }

  const startItems = [
    <TextBlack type="headline" bold>
      {formatMoney(value.CapitalSegurado)}
    </TextBlack>,
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
    <TextBlack type="headline" bold>
      {`${product.QuantidadeParcelasPagas}/${product.QuantidadeParcelasContratadas}`}
    </TextBlack>,
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

const EmptyProductItem = ({ atualItemDetail }) => {
  const history = useHistory()
  const cardTitle =
    atualItemDetail.title === 'Seguro de Vida' ||
    atualItemDetail.title === 'Seguro Viagem'
      ? 'seguros'
      : 'credito'
  return (
    <EmptyProductItemRow>
      <HorizontalListWithMargin
        startItems={[
          <Text type="headline" color="gray5">
            {atualItemDetail.title}
          </Text>,
        ]}
        endItems={[
          <Button
            data-gtm-subname={`card ${cardTitle} ${atualItemDetail.title}`}
            data-gtm-name="conheca"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={() => history.push(atualItemDetail.linkEmpty)}
          >
            CONHEÇA
          </Button>,
        ]}
      />
    </EmptyProductItemRow>
  )
}

EmptyProductItem.propTypes = {
  atualItemDetail: PropTypes.object.isRequired,
}

export default ProductItemGenerator
