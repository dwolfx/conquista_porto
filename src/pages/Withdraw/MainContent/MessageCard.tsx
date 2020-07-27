import React from 'react'
import { useHistory } from 'react-router-dom'

import Icon, { dict } from 'components/IconExporter'
import Text from 'components/Text'

import * as s from './styles'

enum labelType {
  'success' = 'sucesso',
  'error' = 'erro',
}

interface IProps {
  type: 'success' | 'error'
  schedule?: boolean
}

interface IMessage {
  [key: string]: {
    icon: keyof typeof dict
    title: string
    text: string
  }
}

export default function MessageCard({ type }: IProps) {
  const history = useHistory()

  const messages: IMessage = {
    success: {
      icon: 'check',
      title: 'Solicitação de retirada recebida com sucesso.',
      text: 'O dinheiro ficará disponível na sua conta pessoal ainda hoje.',
    },
    error: {
      icon: 'close',
      title: 'Não foi possível confirmar sua solicitação. ',
      text: 'O dinheiro ficará disponível na sua conta pessoal ainda hoje.',
    },
  }

  return (
    <s.Card
      footer={
        <s.MessageButtonWrapper>
          <s.Button
            data-gtm-subname={`card de retirada - ${labelType[type]}`}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-name="ir para página inicial"
            outline
            onClick={() => history.push('/')}
          >
            Página inicial
          </s.Button>
          <s.Button
            data-gtm-subname={`card de retirada - ${labelType[type]}`}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-name="ir para gerenciar investimentos"
            onClick={() => history.push('/investimentos')}
          >
            Gerenciar investimentos
          </s.Button>
        </s.MessageButtonWrapper>
      }
    >
      <s.MessageContainer>
        <s.MessageContent>
          <s.MessageIconContainer>
            <Icon
              name={messages[type].icon}
              width={28}
              color={type === 'success' ? 'green3' : 'magenta2'}
            />
          </s.MessageIconContainer>
          <s.TextWrapper>
            <Text type="headline" color="gray6" bold>
              {messages[type].title}
            </Text>
            <Text type="body" color="gray5" bold>
              {messages[type].title}
            </Text>
          </s.TextWrapper>
        </s.MessageContent>
      </s.MessageContainer>
    </s.Card>
  )
}
