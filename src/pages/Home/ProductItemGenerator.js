import React from 'react'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import {
  ProductItem,
  ItemDivisor,
  ProductItemRow,
  CreditCardItemRow,
  LinearProgressBarContent,
  TextBlack,
  HorizontalListWithMargin,
} from './styles'

const ProductItemGenerator = (productList = [], type, history) => {
  const atualItemDetail = itemDetail[type]

  return productList.map((product, index, divisor) => (
    <>
      {index > 0 || divisor ? <ItemDivisor /> : null}
      <ProductItem>
        <ProductItemRow>
          <Text type="headline">{atualItemDetail.title}</Text>
        </ProductItemRow>
        {atualItemDetail.subTitle(product)}
        {atualItemDetail.bottomLine(product, history)}
      </ProductItem>
    </>
  ))
}

const itemDetail = {
  cartaoCredito: {
    title: 'Cartão de Crédito',
    link: '/cartao-credito/visualizar',
    subTitle: product => (
      <CreditCardItemRow>
        <Text type="captionUppercase">{`FATURA ${product.Fatura.Status}`}</Text>
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
    bottomLine: genericBottomLine,
  },
  consorcioVeiculo: {
    title: 'Consórcio de Veículo',
    subTitle: () => '',
    link: '/consorcio-veiculo/visualizar',
    bottomLine: genericBottomLine,
  },
  consorcioImovel: {
    title: 'Consórcio de Imóvel',
    subTitle: () => '',
    link: '/consorcio-imovel/visualizar',
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

function genericBottomLine(product, history) {
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

export default ProductItemGenerator
