import React from 'react'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import useMedia from 'hooks/useMedia'
import { ICreditProduct } from 'store/modules/Objective/types'

import { formatMoney } from 'helpers'
import * as s from './styles'

interface ISuggestedPlanDetail {
  creditProduct: ICreditProduct | undefined
  incomeMedianValue: number
  answerTargetValue: number
}

const SuggestedPlanDetail = ({
  creditProduct,
  incomeMedianValue,
  answerTargetValue,
  ...rest
}: ISuggestedPlanDetail) => {
  const isMobile = useMedia('sm')

  return answerTargetValue > incomeMedianValue && creditProduct ? (
    <s.GridRow {...rest}>
      <s.GridCol lg={12}>
        <Text type="heading4" color="gray6">
          Plano Sugerido:
        </Text>
        <s.InfoContainer>
          {isMobile ? (
            <>
              <HorizontalList
                size="medium"
                startItems={[
                  <Text type="captionUppercase" bold color="gray4">
                    Carteira recomendada
                  </Text>,
                ]}
                endItems={[
                  <Text type="headline" bold color="gray6">
                    {formatMoney(incomeMedianValue)}
                  </Text>,
                ]}
              />
              <s.AddIcon />
              <HorizontalList
                size="medium"
                startItems={[
                  <Text type="captionUppercase" bold color="gray4">
                    {creditProduct?.name.toLowerCase().includes('financiamento')
                      ? 'Financiamento'
                      : 'Consórcio'}
                  </Text>,
                ]}
                endItems={[
                  <Text type="headline" bold color="gray6">
                    {creditProduct?.values &&
                    isNaN(+creditProduct?.values.value)
                      ? creditProduct?.values.value
                      : formatMoney(creditProduct?.values.value)}
                  </Text>,
                ]}
              />
            </>
          ) : (
            <>
              <s.VerticalList
                elements={[
                  <Text type="captionUppercase" bold color="gray4">
                    Carteira recomendada
                  </Text>,
                  <Text type="headline" bold color="gray6">
                    {formatMoney(incomeMedianValue)}
                  </Text>,
                ]}
              />
              <s.AddIcon />
              <s.VerticalList
                elements={[
                  <Text type="captionUppercase" bold color="gray4">
                    {creditProduct?.name.toLowerCase().includes('financiamento')
                      ? 'Financiamento'
                      : 'Consórcio'}
                  </Text>,
                  <Text type="headline" bold color="gray6">
                    {creditProduct?.values &&
                    isNaN(+creditProduct?.values.value)
                      ? creditProduct?.values.value
                      : formatMoney(creditProduct?.values.value)}
                  </Text>,
                ]}
              />
            </>
          )}
        </s.InfoContainer>
      </s.GridCol>
    </s.GridRow>
  ) : null
}

export default SuggestedPlanDetail
