import React from 'react'
import IconExporter from 'components/IconExporter'
import Text from 'components/Text'
import * as S from './styles'
import BottomNavigationContent from '../commons/BottomNavigationContent'

export default function ProposalResolutionFail() {
  return (
    <S.FlexibleLayerContent
      data-testid="proposalResolutionFail"
      bottomNavigationContent={<BottomNavigationContent />}
    >
      <IconExporter name="closerounded" color="magenta2" width="28px" />
      <Text type="headline" bold color="gray6">
        Não foi possível enviar a proposta.
      </Text>
      <Text type="body" color="gray5">
        Tente novamente mais tarde, por favor.
      </Text>
    </S.FlexibleLayerContent>
  )
}
