import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import Modal from 'components/Modal/ModalNew'

import {
  ModalTextWrapper,
  ContainerBox,
  ContainerAccountInfo,
  TableBox,
} from './styles'

export default function ModalAccountPortoInfo({
  isOpen,
  onChangeModalOpen,
  bankData,
}) {
  return (
    <Modal
      modalTitle="Conta de investimento"
      alignItems="flex-start"
      isOpen={isOpen}
      handleClose={() => onChangeModalOpen(false)}
    >
      <>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Como investir?
          </Text>
          <Text type="headline" color="gray5">
            Para investir você precisará realizar um depósito ou transferência
            para a sua conta de investimento e assim que processarmos a operação
            você estará mais próximo de tornar seus objetivos realidade.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper margin="0 0 14px 0">
          <Text type="headline" color="gray6" bold>
            Dados para transferência (TED)
          </Text>
        </ModalTextWrapper>
        <ContainerBox>
          {bankData &&
            bankData.DadosContaPortoSeguro &&
            bankData.DadosContaPortoSeguro.cpf && (
              <ContainerAccountInfo>
                <TableBox>
                  <Text type="captionUppercase" color="gray4" bold>
                    BANCO
                  </Text>
                  <Text type="headline" color="gray5" bold>
                    {`${bankData.DadosContaPortoSeguro.codigo_banco} - ${bankData.DadosContaPortoSeguro.nome_banco}`}
                  </Text>
                </TableBox>
                <TableBox>
                  <Text type="captionUppercase" color="gray4" bold>
                    AGÊNCIA
                  </Text>
                  <Text type="headline" color="gray5" bold>
                    {bankData.DadosContaPortoSeguro.agencia}
                  </Text>
                </TableBox>
                <TableBox>
                  <Text type="captionUppercase" color="gray4" bold>
                    CONTA
                  </Text>
                  <Text type="headline" color="gray5" bold>
                    {`${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                  </Text>
                </TableBox>
                <TableBox>
                  <Text type="captionUppercase" color="gray4" bold>
                    CPF
                  </Text>
                  <Text type="headline" color="gray5" bold>
                    {bankData.DadosContaPortoSeguro.cpf}
                  </Text>
                </TableBox>
                <TableBox>
                  <Text type="captionUppercase" color="gray4" bold>
                    FAVORECIDO
                  </Text>
                  <Text type="headline" color="gray5" bold>
                    {bankData.DadosContaPortoSeguro.titular}
                  </Text>
                </TableBox>
              </ContainerAccountInfo>
            )}
        </ContainerBox>
        <ModalTextWrapper margin="0 0 14px 0">
          <Text type="headline" color="gray6" bold>
            Informações adicionais
          </Text>
        </ModalTextWrapper>
        <ContainerBox>
          <ModalTextWrapper margin="0 0 21px 0">
            <Text type="headline" color="gray5" bold>
              Esta conta é para recursos relacionados a investimentos apenas.
            </Text>
          </ModalTextWrapper>
          <ModalTextWrapper margin="0 0 21px 0">
            <Text type="headline" color="gray5" bold>
              As transferências devem ser de contas de mesma titularidade do
              favorecido.
            </Text>
          </ModalTextWrapper>
          <ModalTextWrapper margin="0 0 0 0">
            <Text type="headline" color="gray5" bold>
              A Porto Seguro faz a idenfiticação e direcionamento dos recursos.
            </Text>
          </ModalTextWrapper>
        </ContainerBox>
      </>
    </Modal>
  )
}

ModalAccountPortoInfo.defaultProps = {
  bankData: null,
}

ModalAccountPortoInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeModalOpen: PropTypes.func.isRequired,
  bankData: PropTypes.shape({
    DadosContaPortoSeguro: PropTypes.shape({
      titular: PropTypes.string,
      cpf: PropTypes.string,
      digito_conta: PropTypes.string,
      conta: PropTypes.string,
      codigo_banco: PropTypes.string,
      nome_banco: PropTypes.string,
      agencia: PropTypes.string,
    }),
  }),
}
