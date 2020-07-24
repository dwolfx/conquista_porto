import React from 'react'
import Text from 'components/Text'
import * as S from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}

export default function RulesModal({ isOpen, handleClose }: IProps) {
  return (
    <S.ModalStyled
      isOpen={isOpen}
      modalTitle="Regras e condições"
      handleClose={handleClose}
    >
      <S.Container>
        <Text type="headline" color="gray5">
          Esta conta é para recursos relacionados a investimentos apenas.
        </Text>
        <Text type="headline" color="gray5">
          As transferências devem ser de contas de mesma titularidade do
          favorecido.
        </Text>
        <Text type="headline" color="gray5">
          A Porto Seguro faz a identificação e direcionamento dos recursos.
        </Text>
      </S.Container>
    </S.ModalStyled>
  )
}
