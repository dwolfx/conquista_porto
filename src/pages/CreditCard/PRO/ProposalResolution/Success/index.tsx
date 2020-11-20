import React from 'react'
import * as S from './styles'
import UserCard from 'components/Card/UserCard'
import IconExporter from 'components/IconExporter'
import Text from 'components/Text'
import BottomNavigationContent from '../commons/BottomNavigationContent'

interface IProps {
  customerName: string
}

export default function ProposalResolutionSuccess({ customerName }: IProps) {
  return (
    <S.FlexibleLayerContent
      data-testid="proposalResolutionSuccess"
      bottomNavigationContent={<BottomNavigationContent />}
    >
      <S.Message>
        <IconExporter name="check" color="green3" width="28px" />
        <Text type="headline" bold color="gray6">
          Proposta enviada com sucesso
        </Text>
        <Text type="body" color="gray5">
          Seu cliente receberá uma notificação sobre o envio, e tomará a decisão
          pela
          <br />
          contratação. Você poderá acompanhar a decisão do cliente no funil de
          vendas.
        </Text>
      </S.Message>
      <S.UserBox>
        <Text
          textAlign="center"
          type="subheading"
          color="gray5"
          textTransform="uppercase"
        >
          Proposta enviada para:
        </Text>
        <UserCard name={customerName} role="Cliente" />
      </S.UserBox>
    </S.FlexibleLayerContent>
  )
}
