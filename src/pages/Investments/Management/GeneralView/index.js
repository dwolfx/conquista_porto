import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ResponsivePie } from '@nivo/pie'
import { ThemeContext } from 'styled-components'

import { handleGiwRedirect, formatMoney, formatCpf } from 'helpers'
import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'
import { useToast } from 'hooks/toast'

import useFetchBankData from 'hooks/BankData/useFetchBankData'

import ConquistaButton from 'components/Button'
import Modal from 'components/Modal/ModalNew'

import {
  Container,
  General,
  AccountInfo,
  Wrapper,
  Text,
  LinkButton,
  GraphHolder,
  InfoList,
  InfoItem,
  LineDivider,
  FullWidthAccordion,
  ModalText,
  ModalButtonWrapper,
  ModalButton,
} from './styles'

const modalSuitabilityInfoInitialState = {
  isOpen: false,
  title: '',
  description: '',
  button: null,
}

export default function GeneralView() {
  const bankData = useSelector(state => state.bankData.data)
  const generalViewData = useSelector(state => state.investmentPosition.data)
  const theme = useContext(ThemeContext)
  const history = useHistory()
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const colorGuide = [
    theme.colors.yellow2,
    theme.colors.magenta2,
    theme.colors.green4,
    theme.colors.blue4,
  ]

  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const suitabilityIsLoading = useSelector(
    state => state.suitabilityInfo.isLoading
  )

  const generalViewChartData = () => {
    if (!generalViewData || !generalViewData.length) {
      return []
    }

    return [generalViewData[0].visao_geral.fundos.fundo]
      .flatMap(item => item)
      .map((item, index) => ({
        id: item.apelido,
        label: item.apelido,
        value: parseFloat(item.percentual),
        color: colorGuide[index],
      }))
  }

  const showBalance = () => {
    if (bankData.DadosContaPortoSeguro.saldo_disponivel > 0) {
      return (
        <>
          <Text fontSize={22} lineHeight={32} margin="0px 0px 14px 0px">
            Saldo Disponível
          </Text>
          <Text fontSize={18} lineHeight={28} margin="0px 0px 14px 0px">
            {formatMoney(
              bankData.DadosContaPortoSeguro
                ? bankData.DadosContaPortoSeguro.saldo_disponivel
                : 0
            )}
          </Text>
        </>
      )
    }
    return null
  }

  useFetchBankData()

  const handleClickWithdrawButton = () => {
    const onSuccess = data => {
      setModalSuitabilityInfo({ ...data })

      if (data.isValid) {
        handleGiwRedirect('portaldecliente/conquista/retirada?r=true')
      }
    }

    dispatch(GetSuitabilityInfoRequest(onSuccess, 'retirar', addToast))
  }

  return (
    <Container>
      {bankData && generalViewData ? (
        <>
          <Modal
            modalTitle={modalSuitabilityInfo.title}
            isOpen={modalSuitabilityInfo.isOpen}
            handleClose={() =>
              setModalSuitabilityInfo({
                ...modalSuitabilityInfo,
                isOpen: false,
              })
            }
          >
            <ModalText>{modalSuitabilityInfo.description}</ModalText>
            <ModalButtonWrapper>
              {modalSuitabilityInfo.button && (
                <ModalButton
                  data-gtm-name={modalSuitabilityInfo.button.dataGtmName}
                  data-gtm-type={modalSuitabilityInfo.button.dataGtmType}
                  data-gtm-clicktype={
                    modalSuitabilityInfo.button.dataGtmClicktype
                  }
                  onClick={
                    modalSuitabilityInfo.button.handleClick
                      ? modalSuitabilityInfo.button.handleClick
                      : () =>
                          setModalSuitabilityInfo({
                            ...modalSuitabilityInfo,
                            isOpen: false,
                          })
                  }
                >
                  {modalSuitabilityInfo.button.buttonName}
                </ModalButton>
              )}
            </ModalButtonWrapper>
          </Modal>
          <General>
            <Text fontSize={11} lineHeight={21} weight spacing={1.5}>
              VISÃO GERAL DOS INVESTIMENTOS
            </Text>
            <Text fontSize={14} lineHeight={24}>
              Total:{' '}
              {formatMoney(
                generalViewData && generalViewData.length
                  ? generalViewData[0].visao_geral.total
                  : 0
              )}
            </Text>
            <GraphHolder>
              <ResponsivePie
                data={generalViewChartData()}
                margin={{ top: 0, right: 50, bottom: 0, left: 50 }}
                innerRadius={0.45}
                padAngle={2}
                colors={colorGuide}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#000000"
                sliceLabel={() => null}
                tooltipFormat={value => `${value}%`}
                animate
                motionStiffness={90}
                motionDamping={15}
                legends={[]}
              />
            </GraphHolder>
            <Text fontSize={11} lineHeight={21} margin="14px 0px" weight>
              CONTA DE INVESTIMENTOS
            </Text>

            <LinkButton
              data-gtm-subname="conta de investimentos"
              data-gtm-name="ver extrato"
              data-gtm-type="click"
              data-gtm-clicktype="link"
              onClick={() => {
                history.push('/investimentos/extrato')
              }}
            >
              {' '}
              ver extrato &gt;{' '}
            </LinkButton>
            <ConquistaButton
              loading={suitabilityIsLoading}
              loadingColor="white"
              data-gtm-subname="conta de investimentos"
              data-gtm-name="retirar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleClickWithdrawButton()}
            >
              RETIRAR
            </ConquistaButton>
          </General>
          <AccountInfo>
            <LineDivider />
            {showBalance()}
            {bankData.DadosContaPortoSeguro && (
              <FullWidthAccordion
                id={bankData.DadosContaPortoSeguro.id_conta}
                titleNode="Dados da conta"
                gtmName="dados da conta"
              >
                <Wrapper margin="0px 0px 10px 0px">
                  <Text fontSize={10} spacing={1.5} lineHeight={22}>
                    BANCO
                  </Text>
                  <Text fontSize={14} lineHeight={24}>
                    {bankData.DadosContaPortoSeguro.codigo_banco}
                  </Text>
                </Wrapper>
                <Wrapper margin="0px 0px 10px 0px">
                  <Text fontSize={10} spacing={1.5} lineHeight={22}>
                    AGÊNCIA
                  </Text>
                  <Text fontSize={14} lineHeight={24}>
                    {bankData.DadosContaPortoSeguro.agencia}
                  </Text>
                </Wrapper>
                <Wrapper margin="0px 0px 10px 0px">
                  <Text fontSize={10} spacing={1.5} lineHeight={22}>
                    CONTA
                  </Text>
                  <Text fontSize={14} lineHeight={24}>
                    {`${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                  </Text>
                </Wrapper>
                <Wrapper margin="0px 0px 10px 0px">
                  <Text fontSize={10} spacing={1.5} lineHeight={22}>
                    FAVORECIDO
                  </Text>
                  <Text fontSize={14} lineHeight={24}>
                    {bankData.DadosContaPortoSeguro.titular}
                  </Text>
                </Wrapper>
                <Wrapper margin="0px 0px 10px 0px">
                  <Text fontSize={10} spacing={1.5} lineHeight={22}>
                    CPF
                  </Text>
                  <Text fontSize={14} lineHeight={24}>
                    {formatCpf(bankData.DadosContaPortoSeguro.cpf)}
                  </Text>
                </Wrapper>
                <LineDivider />
                <InfoList>
                  <InfoItem>
                    Essa conta é para a recursos relacionados a investimentos
                    apenas
                  </InfoItem>
                  <InfoItem>
                    As transferências dever ser de contas de mesma titularidade
                    do favorecido
                  </InfoItem>
                  <InfoItem>
                    A Porto Seguro faz a identificação e direcionamento dos
                    recursos
                  </InfoItem>
                </InfoList>
              </FullWidthAccordion>
            )}
          </AccountInfo>
        </>
      ) : null}
    </Container>
  )
}
