import React from 'react'
import Modal from 'components/Modal/ModalNew'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import { formatMoney } from 'helpers'

import {
  SectionContent,
  ContainerBox,
  Title,
  TitleHowToInvest,
  ContainerAccountInfo,
  TableBox,
  ModalTextWrapper,
  WrapperHowToInvest,
  WrapperAccountValue,
} from './styles'

interface IModalAccountInfo {
  isOpen: boolean
  onChangeModalOpen: () => void
  bankData: any
}

const ModalAccountInfo = ({
  isOpen,
  onChangeModalOpen,
  bankData,
}: IModalAccountInfo) => {
  const isMobile = useMedia('xs')
  return (
    <Modal
      modalTitle="Conta de investimento"
      alignItems="flex-start"
      isOpen={isOpen}
      handleClose={onChangeModalOpen}
    >
      <SectionContent>
        <Title type="headline" color="gray6" bold>
          Resumo da Conta
        </Title>
        <WrapperAccountValue>
          <HorizontalList
            size="small"
            startItems={[
              <Text type="headline" color="gray4" bold>
                {isMobile ? 'Saldo disp.' : 'Saldo disponível'}
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
            css={`
              width: 100%;
              padding: 0;
            `}
          />
        </WrapperAccountValue>
      </SectionContent>
      <SectionContent>
        <TitleHowToInvest type="headline" color="gray6" bold>
          Como Investir?
        </TitleHowToInvest>
        <WrapperHowToInvest>
          <Text type="headline" color="gray5" bold>
            Para investir você precisará realizar um depósito ou transferência
            para sua conta de investimento e assim que processarmos a operação
            você estará mais próximo de tornar seus objetivos realidade.
          </Text>
        </WrapperHowToInvest>
      </SectionContent>
      <SectionContent>
        <Title type="headline" color="gray6" bold>
          Dados para transferência (TED)
        </Title>
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
      </SectionContent>
      <SectionContent>
        <Title type="headline" color="gray6" bold>
          Regras e Condições
        </Title>
        <ContainerBox>
          <ModalTextWrapper>
            <Text type="headline" color="gray5" bold>
              Esta conta é para recursos relacionados a investimentos apenas.
            </Text>
          </ModalTextWrapper>
          <ModalTextWrapper>
            <Text type="headline" color="gray5" bold>
              As transferências devem ser de contas de mesma titularidade do
              favorecido.
            </Text>
          </ModalTextWrapper>
          <ModalTextWrapper>
            <Text type="headline" color="gray5" bold>
              A Porto Seguro faz a identificação e direcionamento dos recursos.
            </Text>
          </ModalTextWrapper>
        </ContainerBox>
      </SectionContent>
    </Modal>
  )
}

export default ModalAccountInfo
