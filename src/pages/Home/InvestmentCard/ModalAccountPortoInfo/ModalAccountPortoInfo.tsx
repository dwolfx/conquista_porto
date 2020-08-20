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

import { IModalAccountPortoInfo } from '../types'
import * as s from './styles'

export default function ModalAccountPortoInfo({
  isOpen,
  onChangeModalOpen,
  bankData,
}: IModalAccountPortoInfo) {
  const history = useHistory()
  const isMobile = useMedia('xs')

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
        <s.ModalTextWrapper>
          <s.ContainerBox>
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
          </s.ContainerBox>
        </s.ModalTextWrapper>
        <s.ModalTextWrapper margin="0 0 14px 0">
          <Text type="headline" color="gray6" bold>
            Dados para transferência (TED)
          </Text>
        </s.ModalTextWrapper>
        <s.ContainerBox>
          {bankData?.DadosContaPortoSeguro?.cpf && (
            <s.ContainerAccountInfo>
              <s.TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  BANCO
                </Text>
                <Text type="headline" color="gray5" bold>
                  {`${bankData.DadosContaPortoSeguro.codigo_banco} - ${bankData.DadosContaPortoSeguro.nome_banco}`}
                </Text>
              </s.TableBox>
              <s.TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  AGÊNCIA
                </Text>
                <Text type="headline" color="gray5" bold>
                  {bankData.DadosContaPortoSeguro.agencia}
                </Text>
              </s.TableBox>
              <s.TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  CONTA
                </Text>
                <Text type="headline" color="gray5" bold>
                  {`${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                </Text>
              </s.TableBox>
              <s.TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  CPF
                </Text>
                <Text type="headline" color="gray5" bold>
                  {formatCpf(bankData.DadosContaPortoSeguro.cpf)}
                </Text>
              </s.TableBox>
              <s.TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  FAVORECIDO
                </Text>
                <Text type="headline" color="gray5" bold>
                  {bankData.DadosContaPortoSeguro.titular}
                </Text>
              </s.TableBox>
            </s.ContainerAccountInfo>
          )}
        </s.ContainerBox>
        <s.ModalTextWrapper margin="0 0 14px 0">
          <Text type="headline" color="gray6" bold>
            Regras e condições
          </Text>
        </s.ModalTextWrapper>
        <s.ContainerBox>
          <s.ModalTextWrapper margin="0 0 21px 0">
            <Text type="headline" color="gray5" bold>
              Esta conta é para recursos relacionados a investimentos apenas.
            </Text>
          </s.ModalTextWrapper>
          <s.ModalTextWrapper margin="0 0 21px 0">
            <Text type="headline" color="gray5" bold>
              As transferências devem ser de contas de mesma titularidade do
              favorecido.
            </Text>
          </s.ModalTextWrapper>
          <s.ModalTextWrapper margin="0 0 0 0">
            <Text type="headline" color="gray5" bold>
              A Porto Seguro faz a identificação e direcionamento dos recursos.
            </Text>
          </s.ModalTextWrapper>
        </s.ContainerBox>
      </>
    </Modal>
  )
}
