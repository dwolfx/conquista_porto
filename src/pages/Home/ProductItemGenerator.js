import React from 'react'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import {
  ProductItem,
  ThreeItemsLine,
  ItemLine,
  ItemDivisor,
  ParagraphWithMargin,
} from './styles'

const ProductItemGenerator = (productList = [], type, history) => {
  const atualItemDetail = itemDetail[type]

  return productList.map((product, index, divisor) => (
    <>
      {index > 0 || divisor ? <ItemDivisor /> : null}
      <ProductItem>
        <Text type="headline">{atualItemDetail.title}</Text>
        {atualItemDetail.subTitle(product)}
        {atualItemDetail.threeItemsLine(product, history)}
      </ProductItem>
    </>
  ))
}

const itemDetail = {
  cartaoCredito: {
    title: 'Cartão de Crédito',
    link: '/cartao-credito/visualizar',
    subTitle: product => (
      <ParagraphWithMargin type="body" fontSize="12px" margin="14px 0 0 0">
        <span style={{ marginLeft: '34px' }}>
          {`FATURA ${product.Fatura.Status}`}
        </span>
      </ParagraphWithMargin>
    ),
    threeItemsLine(product, history) {
      const { link } = this
      return (
        <ThreeItemsLine gridTemplateColumns="1fr 4fr 3fr">
          <ItemLine padding="5px 10px 0 0">
            <Icon name={product.Bandeira.toLowerCase()} />
          </ItemLine>
          <ItemLine alignSelf="center">
            <Text type="headline" bold>
              {formatMoney(product.Fatura.Valor)}
            </Text>
          </ItemLine>
          <ItemLine justifySelf="end" alignSelf="center" height="85%">
            <ButtonLink
              onClick={() => {
                history.push(link)
              }}
            >
              GERENCIAR
            </ButtonLink>
          </ItemLine>
        </ThreeItemsLine>
      )
    },
  },
  financiamentoVeiculo: {
    title: 'Financiamento de Veículos',
    subTitle: () => '',
    link: '/financiamento-veiculo/visualizar',
    threeItemsLine: genericThreeItemsLine,
  },
  consorcioVeiculo: {
    title: 'Consórcio de Veículo',
    subTitle: () => '',
    link: '/consorcio-veiculo/visualizar',
    threeItemsLine: genericThreeItemsLine,
  },
  consorcioImovel: {
    title: 'Consórcio de Imóvel',
    subTitle: () => '',
    link: '/consorcio-imovel/visualizar',
    threeItemsLine: genericThreeItemsLine,
  },
  seguroVida: {
    title: 'Seguro de vida',
    subTitle: () => (
      <ParagraphWithMargin type="body" fontSize="12px" margin="14px 0 0 0">
        Cobertura principal
      </ParagraphWithMargin>
    ),
    link: '/seguro-vida/visualizar',
    threeItemsLine: insuranceTwoItemsLine,
  },
}

function insuranceTwoItemsLine(product, history) {
  const { link } = this

  let value = ''

  try {
    value =
      product.GruposCobertura.GrupoCobertura[0].CoberturasRisco
        .CoberturaRisco[1].CapitalSegurado
  } catch (error) {
    value = ''
  }

  return (
    <ThreeItemsLine gridTemplateColumns="2fr 2fr">
      <ItemLine padding="0 14px 0 0" width="100%">
        <Text type="headline" bold>
          {formatMoney(value)}
        </Text>
      </ItemLine>
      <ItemLine justifySelf="end" alignSelf="center" height="85%">
        <ButtonLink
          onClick={() => {
            history.push(link)
          }}
        >
          GERENCIAR
        </ButtonLink>
      </ItemLine>
    </ThreeItemsLine>
  )
}

function genericThreeItemsLine(product, history) {
  const { link } = this
  return (
    <ThreeItemsLine gridTemplateColumns="2fr 2fr 3fr">
      <ItemLine padding="0 14px 0 0" width="100%">
        <MiniLinearProgressBar
          atual={parseInt(product.QuantidadeParcelasPagas, 10)}
          max={parseInt(product.QuantidadeParcelasContratadas, 10)}
        />
      </ItemLine>
      <ItemLine>
        <Text type="headline" bold>
          {`${product.QuantidadeParcelasPagas}/${product.QuantidadeParcelasContratadas}`}
        </Text>
      </ItemLine>
      <ItemLine justifySelf="end" alignSelf="center" height="85%">
        <ButtonLink
          onClick={() => {
            history.push(link)
          }}
        >
          GERENCIAR
        </ButtonLink>
      </ItemLine>
    </ThreeItemsLine>
  )
}

export default ProductItemGenerator
