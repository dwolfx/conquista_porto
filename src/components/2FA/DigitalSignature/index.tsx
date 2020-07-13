import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Text from 'components/Text'
import Button from 'components/Button'
import SecuritySeal from 'components/SecuritySeal'
import IconExporter from 'components/IconExporter'

import {
  Card,
  Container,
  ContainerSecuritySeal,
  VirtualKeyboard,
  Key,
  Footer,
  InputStyled,
} from '../styles'

interface IProps {
  onPrevious: () => void
  onConfirm: () => void
}

const DigitalSignature = ({ onPrevious, onConfirm, ...rest }: IProps) => {
  const { data } = useSelector((state: any) => state.virtualKeyboard)
  const [signature, setSignature] = useState<string>('')

  const handleVirtualKeyboardKey = (item: any) => {
    const [key] = Object.keys(item)
    return (
      <Key
        key={key}
        role="button"
        onClick={() => {
          if (signature.length < 6) {
            setSignature(prevState => `${prevState}${key}`)
          }
        }}
      >
        <Text type="caption" color="gray5">
          {item[key].replace(',', ' ou ')}
        </Text>
      </Key>
    )
  }

  return (
    <Card {...rest}>
      <Container>
        <Text type="headline" color="gray6">
          Agora, insira sua assinatura eletrônica através do teclado virtual
          abaixo:
        </Text>
        <InputStyled
          readOnly
          value={signature}
          type="password"
          placeholder="Assinatura eletrônica"
          data-gtm-type="form"
          data-gtm-formtype="input"
          data-gtm-subname="preenchimento assinatura eletronica"
          data-gtm-name="autenticacao assinature eletronica"
        />
        <VirtualKeyboard>
          {data && data.map(handleVirtualKeyboardKey)}
          <Key
            role="button"
            onClick={() => {
              if (signature.length > 0) {
                setSignature(prevState =>
                  prevState.substring(0, prevState.length - 1)
                )
              }
            }}
          >
            <IconExporter name="backspace" />
          </Key>
        </VirtualKeyboard>
        <ContainerSecuritySeal>
          <SecuritySeal />
        </ContainerSecuritySeal>
      </Container>
      <Footer>
        <Button
          outline
          onClick={onPrevious}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="assinatura eletronica"
          data-gtm-name="botao voltar tela anterior"
        >
          voltar
        </Button>
        <Button
          color="secondary"
          disabled={signature.length < 6}
          onClick={onConfirm}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="assinatura eletronica"
          data-gtm-name="botao confirmacao"
        >
          confirmar
        </Button>
      </Footer>
    </Card>
  )
}

export default DigitalSignature
