import React from 'react'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import useMedia from 'hooks/useMedia'

import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'
import * as s from './styles'

interface IDocumentInfo {
  formData: ICreditCardCreationPayload
}

interface IDocumentProps {
  label: string
  value: string | undefined
  isMobile: boolean
}

const DocumentData = ({ label, value, isMobile }: IDocumentProps) => {
  const labelTextType = isMobile ? 'captionUppercase' : 'caption'
  const labelColor = isMobile ? 'gray4' : 'gray5'
  const valueTextType = isMobile ? 'headline' : 'title'

  return (
    <s.FlexWrapper>
      <s.KeyWrapper>
        <Text bold type={labelTextType} color={labelColor}>
          {label}
        </Text>
      </s.KeyWrapper>
      <s.ValueWrapper>
        {value ? (
          <Text bold type={valueTextType} color="gray6">
            {value}
          </Text>
        ) : (
          <Text type="caption" color="magenta2">
            Não preenchido
          </Text>
        )}
      </s.ValueWrapper>
    </s.FlexWrapper>
  )
}

const DocumentInfo = ({ formData }: IDocumentInfo) => {
  const isMobile = useMedia('sm')

  return (
    <s.Wrapper>
      <DocumentData
        label="Documento"
        value={formData.tipoDocumento}
        isMobile={isMobile}
      />
      {isMobile && <Divisor />}
      <DocumentData
        label="Número"
        value={formData.numeroDocumentoIdentificacao}
        isMobile={isMobile}
      />
      {isMobile && <Divisor />}
      <DocumentData
        label="Data de expedição"
        value={formData.dataEmissaoDocumento}
        isMobile={isMobile}
      />
      {isMobile && <Divisor />}
      <DocumentData
        label="Órgão emissor"
        value={formData.orgaoExpedidor}
        isMobile={isMobile}
      />
    </s.Wrapper>
  )
}

export default DocumentInfo
