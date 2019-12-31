import React from 'react'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import { ProductItem, ThreeItemsLine, ItemLine, ItemDivisor } from './styles'

const ProductItemGenerator = (productList = [], type, history) => {
  const atualItemDetail = itemDetail[type]

  return productList.map((product, index) => (
    <>
      {index > 0 ? <ItemDivisor /> : null}
      <ProductItem>
        <Text type="headline">{atualItemDetail.title}</Text>
        <Text type="captionUppercase" fontSize="12px">
          {atualItemDetail.subTitle(product)}
        </Text>
        {atualItemDetail.threeItemsLine(product, history)}
      </ProductItem>
    </>
  ))
}

const itemDetail = {
  financiamentoVeiculo: {
    title: 'Financiamento de Veículos',
    subTitle: product => product.Contrato,
    threeItemsLine: (product, history) => (
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
              history.push('/financiamento-veiculo/visualizar')
            }}
          >
            GERENCIAR
          </ButtonLink>
        </ItemLine>
      </ThreeItemsLine>
    ),
  },
  cartaoCredito: {
    title: 'Cartão de Crédito',
    subTitle: product => (
      <span style={{ marginLeft: '34px' }}>
        {`Fatura ${product.Fatura.Status}`}
      </span>
    ),
    threeItemsLine: (product, history) => (
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
              history.push('/cartao-credito/visualizar')
            }}
          >
            GERENCIAR
          </ButtonLink>
        </ItemLine>
      </ThreeItemsLine>
    ),
  },
}

export default ProductItemGenerator
