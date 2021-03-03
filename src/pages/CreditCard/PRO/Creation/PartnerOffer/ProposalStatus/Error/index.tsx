import React from 'react'

import Button from 'components/Button'
import IconExporter from 'components/IconExporter'
import Text from 'components/Text'

import * as S from '../styles'

export default function ProposalStatusError() {
  return (
    <S.FlexibleLayerContentStatus
      data-testid="proposalResolutionFail"
      bottomNavigationContent={
        <S.Content data-testid="bottomNavigationContent">
          <Button outline>Início</Button>
          <Button outline>Funil de vendas</Button>
        </S.Content>
      }
    >
      <S.ErrorMessageWrapper>
        <IconExporter name="closerounded" color="magenta2" width="28px" />
        <Text type="headline" bold color="gray6">
          Não foi possível enviar a proposta.
        </Text>
        <Text type="body" color="gray5">
          Tente novamente mais tarde, por favor.
        </Text>
      </S.ErrorMessageWrapper>
    </S.FlexibleLayerContentStatus>
  )
}
