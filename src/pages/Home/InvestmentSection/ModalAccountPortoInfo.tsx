import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Text from 'components/Text'
import Modal from 'components/Modal/ModalNew'
import HorizontalList from 'components/HorizontalList'
import VerticalList from 'components/VerticalList'

import { formatMoney, formatCpf } from 'helpers'

import Button from 'components/Button'
import WithdrawButton from 'components/Button/WithdrawButton'
import useMedia from 'hooks/useMedia'

import {
  ModalTextWrapper,
  ContainerBox,
  ContainerAccountInfo,
  TableBox,
} from './styles'

interface IProps {
  isOpen: boolean
  onChangeModalOpen: Function
  bankData?: {
    DadosContaPortoSeguro: {
      titular: string
      cpf: string
      saldo_disponivel: string
      digito_conta: string
      conta: string
      codigo_banco: string
      nome_banco: string
      agencia: string
    }
  }
}

export default function ModalAccountPortoInfo({
  isOpen,
  onChangeModalOpen,
  bankData,
}: IProps) {
  const history = useHistory()
  const isMobile = useMedia('sm')

  const ButtonInvestir = () => (
    <Button
      color="secondary"
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="investimentos e resgate"
      data-gtm-name="investir"
      onClick={() => {
        history.push('/investimentos/lista-fundos')
      }}
    >
      investir
    </Button>
  )

  return (
    <Modal
      modalTitle="Conta de investimento"
      alignItems="flex-start"
      isOpen={isOpen}
      handleClose={() => onChangeModalOpen(false)}
    >
      <>
        <ModalTextWrapper>
          <ContainerBox>
            {isMobile ? (
              <VerticalList
                elements={[
                  <HorizontalList
                    noPadding
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
                    ]}
                  />,
                  <WithdrawButton gtmSubname="botao retirar modal" />,
                  <ButtonInvestir />,
                ]}
              />
            ) : (
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
                  <WithdrawButton gtmSubname="botao retirar modal" />,
                  <ButtonInvestir />,
                ]}
                css={`
                  width: 100%;
                  padding: 0;
                `}
              />
            )}
          </ContainerBox>
        </ModalTextWrapper>
        <ModalTextWrapper margin="0 0 14px 0">
          <Text type="headline" color="gray6" bold>
            Dados para transferência (TED)
          </Text>
        </ModalTextWrapper>
        <ContainerBox>
          {bankData?.DadosContaPortoSeguro?.cpf && (
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
                  {formatCpf(bankData.DadosContaPortoSeguro.cpf)}
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
            Regras e condições
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
