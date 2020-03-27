import React from 'react'
import 'styled-components/macro'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import Modal from 'components/Modal/ModalNew'
import HorizontalList from 'components/HorizontalList'
import { formatMoney, handleGiwRedirect } from 'helpers'
import Button from 'components/Button'

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
  userCPF,
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
          <Text
            type="headline"
            color="gray6"
            bold
            css={`
              margin-bottom: 7px;
            `}
          >
            Resumo da conta
          </Text>

          <ContainerBox>
            <HorizontalList
              size="small"
              startItems={[
                <Text type="headline" color="gray4" bold>
                  Saldo disponível
                </Text>,
              ]}
              endItems={[
                <Text type="headline" color="gray6" bold>
                  {formatMoney(
                    bankData && bankData.DadosContaPortoSeguro
                      ? bankData.DadosContaPortoSeguro.saldo_disponivel
                      : 0
                  )}
                </Text>,
                <Button
                  outline
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  data-gtm-subname="investimentos e resgate"
                  data-gtm-name="resgatar"
                  onClick={() => {
                    handleGiwRedirect(
                      `portaldecliente/conquista/resgate?r=true&cpf=${userCPF}`
                    )
                  }}
                >
                  Resgatar
                </Button>,
              ]}
              css={`
                width: 100%;
                padding: 0;
              `}
            />
          </ContainerBox>
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
              A Porto Seguro faz a identificação e direcionamento dos recursos.
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
  userCPF: PropTypes.string.isRequired,
  bankData: PropTypes.shape({
    DadosContaPortoSeguro: PropTypes.shape({
      titular: PropTypes.string,
      cpf: PropTypes.string,
      saldo_disponivel: PropTypes.string,
      digito_conta: PropTypes.string,
      conta: PropTypes.string,
      codigo_banco: PropTypes.string,
      nome_banco: PropTypes.string,
      agencia: PropTypes.string,
    }),
  }),
}
