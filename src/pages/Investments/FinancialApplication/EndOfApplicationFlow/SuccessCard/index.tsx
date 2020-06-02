import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useMedia from 'hooks/useMedia'

import VerticalList from 'components/VerticalList'

import { IProps } from '../styles'

import * as s from '../styles'

const SuccessCard = ({ onCloseLayer }: IProps) => {
  const history = useHistory()
  const isMobile = useMedia('sm')

  const { bankData } = useSelector<any, any>(state => ({
    bankData: state.bankData.data,
  }))

  const cardFooter = (
    <s.ButtonsWrapper>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="gerenciar investimentos"
        outline
        onClick={() => history.push('/investimentos/visualizar')}
      >
        Gerenciar Investimentos
      </s.Button>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="lista de fundos"
        onClick={() => onCloseLayer()}
      >
        Lista de Fundos
      </s.Button>
    </s.ButtonsWrapper>
  )

  return (
    <>
      <s.Card footer={!isMobile && cardFooter}>
        <s.ContentWrapper>
          <s.TitleWrapper>
            <s.Icon name="check" color="green3" />
            <s.Title>Solicitação de aplicação recebida com sucesso</s.Title>
          </s.TitleWrapper>
          <s.InfoTextSuccess>
            Para que a informação seja efetivada, é preciso que sua conta de
            investimento tenha saldo suficiente.
            {!isMobile && <br />}
            Pode levar alguns minutos até que o fundo apareça na sua tela de
            gestão.
          </s.InfoTextSuccess>
          <s.SubTitle>Dados para tranferência (TED)</s.SubTitle>
          <s.AccountWrapper>
            {bankData &&
              bankData.DadosContaPortoSeguro &&
              bankData.DadosContaPortoSeguro.cpf && (
                <s.ContainerAccountInfo>
                  <s.TableBox>
                    <VerticalList
                      elements={[
                        <s.AccountInfoTitle>BANCO</s.AccountInfoTitle>,
                        <s.AccountInfoText>
                          {`${bankData.DadosContaPortoSeguro.codigo_banco}- ${bankData.DadosContaPortoSeguro.nome_banco}`}
                        </s.AccountInfoText>,
                      ]}
                    />
                  </s.TableBox>
                  <s.TableBox>
                    <VerticalList
                      elements={[
                        <s.AccountInfoTitle>AGÊNCIA</s.AccountInfoTitle>,
                        <s.AccountInfoText>
                          {bankData.DadosContaPortoSeguro.agencia}
                        </s.AccountInfoText>,
                      ]}
                    />
                  </s.TableBox>
                  <s.TableBox>
                    <VerticalList
                      elements={[
                        <s.AccountInfoTitle>CONTA</s.AccountInfoTitle>,
                        <s.AccountInfoText>
                          {`${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                        </s.AccountInfoText>,
                      ]}
                    />
                  </s.TableBox>
                  <s.TableBox>
                    <VerticalList
                      elements={[
                        <s.AccountInfoTitle>CPF</s.AccountInfoTitle>,
                        <s.AccountInfoText>
                          {bankData.DadosContaPortoSeguro.cpf}
                        </s.AccountInfoText>,
                      ]}
                    />
                  </s.TableBox>
                  <s.TableBox>
                    <VerticalList
                      elements={[
                        <s.AccountInfoTitle>FAVORECIDO</s.AccountInfoTitle>,
                        <s.AccountInfoText>
                          {bankData.DadosContaPortoSeguro.titular}
                        </s.AccountInfoText>,
                      ]}
                    />
                  </s.TableBox>
                </s.ContainerAccountInfo>
              )}
          </s.AccountWrapper>
          <s.SubTitle>Regras e Condições</s.SubTitle>
          <s.RulesAndConditionsWrapper>
            <s.RulesAndConditionsText>
              Esta conta é para recursos relacionados a investimentos apenas.
            </s.RulesAndConditionsText>
            <s.RulesAndConditionsText>
              As transferências devem ser de contas de mesma titularidade do
              favorecido.
            </s.RulesAndConditionsText>
            <s.RulesAndConditionsText>
              A Porto Seguro faz a identificação e direcionamento dos recursos.
            </s.RulesAndConditionsText>
          </s.RulesAndConditionsWrapper>
        </s.ContentWrapper>
      </s.Card>
      {isMobile && <s.FixedBottom>{cardFooter}</s.FixedBottom>}
    </>
  )
}

export default SuccessCard
