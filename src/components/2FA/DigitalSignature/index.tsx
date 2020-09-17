import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import Text from 'components/Text'
import SecuritySeal from 'components/SecuritySeal'
import IconExporter from 'components/IconExporter'
import Modal from 'components/Modal/Confirmation'

import { useToast } from 'hooks/toast'
import { ValidateTokenNSignature } from 'store/modules/2FAToken/action'
import { PostNewSignatureDataRequest } from 'store/modules/VirtualKeyboard/action'

import {
  Card,
  Container,
  ContainerSecuritySeal,
  VirtualKeyboard,
  Key,
  Footer,
  InputStyled,
  Button,
  ContainerNewSignature,
  ButtonNewSignature,
  ButtonMobileNewSignature,
  TextSpace,
} from '../styles'
import useMedia from 'hooks/useMedia'

interface IProps {
  onPrevious: (stepsBack: number) => void
  onConfirm: () => void
  onError: () => void
  isNextButtonLoading: boolean
}

const DigitalSignature = ({
  onPrevious,
  onConfirm,
  onError,
  isNextButtonLoading,
  ...rest
}: IProps) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isMobile = useMedia('sm')

  const [signature, setSignature] = useState<string>('')
  const [
    isModalConfirmGenerateNewSignatureOpen,
    setIsModalConfirmGenerateNewSignatureOpen,
  ] = useState<boolean>(false)

  const {
    keyboardData,
    tokenData,
    isToken2faLoading,
    isVirtualKeyboardLoading,
    isLoadingNewSignature,
  } = useSelector((state: any) => ({
    keyboardData: state.virtualKeyboard,
    tokenData: state.token2fa,
    isToken2faLoading: state.token2fa.isLoading,
    isVirtualKeyboardLoading: state.virtualKeyboard.isLoading,
    isLoadingNewSignature: state.virtualKeyboard.isLoadingNewSignature,
  }))

  const isLoading =
    isToken2faLoading ||
    isVirtualKeyboardLoading ||
    tokenData.isLoading ||
    keyboardData.isLoading ||
    isNextButtonLoading

  const labelNewSignature = 'gerar nova assinatura'

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
        <Text
          type="caption"
          color="gray5"
          css={`
            user-select: none;
          `}
        >
          {item[key].replace(',', ' ou ')}
        </Text>
      </Key>
    )
  }

  const handleModalNewSignatureCloseOrOpen = (closeOrOpenModal: boolean) => {
    setIsModalConfirmGenerateNewSignatureOpen(closeOrOpenModal)
  }

  const generateNewSignature = () => {
    dispatch(
      PostNewSignatureDataRequest(
        'email_otp',
        addToast,
        handleModalNewSignatureCloseOrOpen
      )
    )
  }

  return (
    <Card
      {...rest}
      footer={
        <Footer>
          <Button
            outline
            onClick={() => {
              onPrevious(1)
            }}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="assinatura eletronica"
            data-gtm-name="botao voltar tela anterior"
          >
            voltar
          </Button>
          <Button
            color="secondary"
            disabled={signature.length < 6 || isLoading}
            loading={isLoading}
            loadingColor="white"
            onClick={() => {
              /**
               * - clicou:
               *   - valida token
               *   - valida assinatura
               *   - ok?
               *     - onConfirm (request POST de retirar/assinatura)
               *   - não ok?
               *     - incrementa state de error
               *     - previousStep (volta pra tela do token)
               * - state de error === 5
               *   - onError
               * */
              dispatch(
                ValidateTokenNSignature({
                  signature,
                  onError,
                  onSuccess: onConfirm,
                  addToast,
                  goToPreviousStep: () => {
                    onPrevious(2)
                  },
                })
              )
            }}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="assinatura eletronica"
            data-gtm-name="botao confirmacao"
          >
            confirmar
          </Button>
        </Footer>
      }
    >
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
          {keyboardData?.data?.map(handleVirtualKeyboardKey)}
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
        <ContainerNewSignature>
          <Text type="body" color="gray6">
            Esqueceu sua assinatura eletrônica?
          </Text>
          {isMobile ? (
            <ButtonMobileNewSignature
              outline
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="assinatura eletronica"
              data-gtm-name="botao confirma gerar nova"
              onClick={() => handleModalNewSignatureCloseOrOpen(true)}
            >
              {labelNewSignature}
            </ButtonMobileNewSignature>
          ) : (
            <ButtonNewSignature
              noIcon
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="assinatura eletronica"
              data-gtm-name="botao confirma gerar nova"
              onClick={() => handleModalNewSignatureCloseOrOpen(true)}
            >
              {labelNewSignature}
            </ButtonNewSignature>
          )}
          <Modal
            isOpen={isModalConfirmGenerateNewSignatureOpen}
            title="Gerar nova assinatura?"
            loading={isLoadingNewSignature}
            loadingColor="white"
            buttonTextCancel="voltar"
            buttonTextConfirm="enviar para e-mail"
            onClose={() => handleModalNewSignatureCloseOrOpen(false)}
            onConfirmation={generateNewSignature}
          >
            <Text type="headline" color="gray6">
              Tem certeza que deseja gerar uma nova assinatura eletrônica?
            </Text>
            <TextSpace />
            <Text type="headline" bold color="gray6">
              Sua nova assinatura será enviada para o endereço de e-mail
              cadastrado.
            </Text>
          </Modal>
        </ContainerNewSignature>
        <ContainerSecuritySeal>
          <SecuritySeal />
        </ContainerSecuritySeal>
      </Container>
    </Card>
  )
}

export default DigitalSignature
