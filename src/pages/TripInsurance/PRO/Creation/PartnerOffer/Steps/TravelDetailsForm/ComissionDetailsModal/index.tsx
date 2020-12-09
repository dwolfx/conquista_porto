import React from 'react'
import 'styled-components/macro'

import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import * as S from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const ComissionDetailsModal = ({ isOpen, handleClose }: IProps) => 
  <Modal 
    modalTitle="Orientações"
    isOpen={isOpen}
    handleClose={handleClose}
  >
    <S.Wrapper>
      <Text bold type="headline" color="gray6" >Seguro Viagem</Text>
    </S.Wrapper>

    <S.Wrapper>
      <Text type="headline" color="gray5" css={`margin-bottom: 21px;`}>
      O valor numérico representa a % do prêmio que será pago como <br />remuneração. A letra representa o valor do agenciamento.
      </Text>
      <Text type="headline" color="gray5">
        A - Sem agenciamento
      </Text>
      <Text type="headline" color="gray5">
        B - Primeira parcela (1/12) do prêmio
      </Text>
        <Text type="headline" color="gray5">
        C - Primeira e segunda parcela (2/12) do prêmio
      </Text>        
    </S.Wrapper>

    <S.ExampleWrapper>
      <Text bold type="headline" color="gray6" >Exemplo</Text>
      <br />
      <Text type="headline" color="gray5">30A - 30% do prêmio sem agenciamento</Text>
      <Text type="headline" color="gray5">25B - 25% do prêmio com agenciamento (Primeira parcela)</Text>
      <Text type="headline" color="gray5">20C - 20% do prêmio com agenciamento (Primeira e segunda parcela)</Text>
    </S.ExampleWrapper>
  </Modal>

export default ComissionDetailsModal