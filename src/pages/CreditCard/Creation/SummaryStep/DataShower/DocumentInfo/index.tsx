import React from 'react'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import useMedia from 'hooks/useMedia'

import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'
import * as s from './styles'

interface IDocumentInfo {
  formData: ICreditCardCreationPayload
}

const DocumentInfo = ({ formData }: IDocumentInfo) => {
  const isMobile = useMedia('sm')
  const labelTextType = isMobile ? 'captionUppercase' : 'caption'
  const labelColor = isMobile ? 'gray4' : 'gray5'

  const valueTextType = isMobile ? 'headline' : 'title'

  return (
    <s.Wrapper>
      <s.FlexWrapper>
        <s.KeyWrapper>
          <Text bold type={labelTextType} color={labelColor}>
            Documento
          </Text>
        </s.KeyWrapper>
        <s.ValueWrapper>
          <Text bold type={valueTextType} color="gray6">
            {formData.tipoDocumento}
          </Text>
        </s.ValueWrapper>
      </s.FlexWrapper>
      {isMobile && <Divisor />}
      <s.FlexWrapper>
        <s.KeyWrapper>
          <Text bold type={labelTextType} color={labelColor}>
            Número
          </Text>
        </s.KeyWrapper>
        <s.ValueWrapper>
          <Text bold type={valueTextType} color="gray6">
            {formData.numeroDocumentoIdentificacao}
          </Text>
        </s.ValueWrapper>
      </s.FlexWrapper>
      {isMobile && <Divisor />}
      <s.FlexWrapper>
        <s.KeyWrapper>
          <Text bold type={labelTextType} color={labelColor}>
            Data de expedição
          </Text>
        </s.KeyWrapper>
        <s.ValueWrapper>
          <Text bold type={valueTextType} color="gray6">
            {formData.dataEmissaoDocumento}
          </Text>
        </s.ValueWrapper>
      </s.FlexWrapper>
      {isMobile && <Divisor />}
      <s.FlexWrapper>
        <s.KeyWrapper>
          <Text bold type={labelTextType} color={labelColor}>
            Orgão emissor
          </Text>
        </s.KeyWrapper>
        <s.ValueWrapper>
          <Text bold type={valueTextType} color="gray6">
            {formData.orgaoExpedidor}
          </Text>
        </s.ValueWrapper>
      </s.FlexWrapper>
    </s.Wrapper>
  )
}

export default DocumentInfo
