import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from 'hooks/toast'

import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'

import Icon from 'components/IconExporter'
import DropDown from 'components/DropdownNew'
import Popover from 'components/Popover'
import Modal from 'components/Modal/ModalNew'

import { formatMoney, handleGiwRedirect } from 'helpers'

import { months } from './data'
import {
  PageTitle,
  Topic,
  TopicTitle,
  TopicValue,
  BalanceAccordion,
  HeaderNodeBalanceAccordion,
  CurrentBalance,
  GrossIncome,
  Text,
  RowBankTransition,
  BankTransitionDateWrapper,
  SelectBox,
  SelectItem,
  SelectIcon,
  TopicsContentRow,
  ButtonWrapper,
  CustomConquistaButton,
  LockIcon,
  ModalText,
  ModalButtonWrapper,
  ModalButton,
} from './styles'

const modalSuitabilityInfoInitialState = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: () => {},
  },
}

export default function FundInformation({ fund, idCotista }) {
  const theme = useContext(ThemeContext)

  const [incomeValue, setIncomeValue] = useState(null)
  const [selectValue, setSelectValue] = useState('')
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const dispatch = useDispatch()
  const { addToast } = useToast()

  const suitabilityIsLoading = useSelector(
    state => state.suitabilityInfo.isLoading
  )
  useEffect(() => {
    setIncomeValue(fund.rendimentos.rendimento[months[0].value].valorrendimento)
  }, [fund])

  const handleSelectChange = item => {
    setSelectValue(item.name)
    setIncomeValue(
      fund.rendimentos.rendimento[months[item.value].value].valorrendimento
    )
  }

  const getTributacao = (fundItem, tipoTributacao, moneyFormatted = true) => {
    const valorTributacao =
      fundItem && fundItem.tributacoes
        ? fundItem.tributacoes.tributacao.find(
            t => t.tipo === tipoTributacao.toUpperCase()
          ).valor
        : null
    if (!moneyFormatted) {
      return valorTributacao || null
    }
    return valorTributacao ? formatMoney(valorTributacao) : '--'
  }

  const calculatedBalance = fundItem => {
    const tributacaoSum =
      +getTributacao(fundItem, 'IOF', false) +
      +getTributacao(fundItem, 'IR', false)

    const saldoBruto = fundItem.saldo_atual
    const saldoBloqueado = fundItem.saldo_bloqueado || 0
    const saldoDisponivel = saldoBruto - saldoBloqueado
    const saldoLiquido = saldoDisponivel - tributacaoSum

    return {
      saldoBruto,
      saldoBloqueado,
      saldoDisponivel,
      saldoLiquido,
    }
  }

  const getUpdatedBalance = fundItem => {
    let lastBalance = fundItem.historico_saldos_fundo.saldos.saldo
    if (Array.isArray(lastBalance)) {
      lastBalance = lastBalance[lastBalance.length - 1]
    }
    return (
      <>
        <Text>{lastBalance ? formatMoney(lastBalance.valorsaldo) : '--'}</Text>
        <Text>
          {lastBalance
            ? `em: ${moment(lastBalance.data).format('DD/MM/YYYY')}`
            : '--'}
        </Text>
      </>
    )
  }

  const getGiwPath = type => {
    const paths = {
      investir: 'aplicacao',
      resgatar: 'resgate',
    }

    return paths[type]
  }

  const buildGiwUrl = (fundItem, action) => {
    const {
      fundo: { nome_gestor, apelido, id_carteira },
      categoria_arena,
    } = fundItem

    return `portaldecliente/conquista/${getGiwPath(
      action
    )}?idFundo=${id_carteira}&idCotista=${idCotista}&nomeFundo=${apelido}&tipoFundo=${categoria_arena}&brand=${nome_gestor}&r=true`
  }

  function renderSelectItems(closeFunc) {
    const handleClick = item => {
      handleSelectChange(item)
      closeFunc()
    }

    const nodes = months.map(item => (
      <SelectItem key={item.name} onClick={() => handleClick(item)}>
        {item.name}
      </SelectItem>
    ))

    return nodes
  }

  const handleClickInvestButton = () => {
    const onSuccess = data => {
      setModalSuitabilityInfo({ ...data })

      if (data.isValid) {
        handleGiwRedirect(buildGiwUrl(fund, 'investir'))
      }
    }

    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  const handleClickRedeemButton = () => {
    const onSuccess = data => {
      setModalSuitabilityInfo({ ...data })

      if (data.isValid) {
        handleGiwRedirect(buildGiwUrl(fund, 'resgatar'))
      }
    }

    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'resgatar', addToast))
  }

  return (
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
              data-gtm-clicktype={modalSuitabilityInfo.button.dataGtmClicktype}
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
      <PageTitle>{fund.fundo.apelido}</PageTitle>
      <div>
        <TopicsContentRow>
          <Topic>
            <Icon width="28" fill={theme.colors.blue4} name="time" />
            <div>
              <TopicTitle>perfil de risco</TopicTitle>
              <TopicValue>{fund.fundo.perfil_risco}</TopicValue>
            </div>
          </Topic>
          <Topic>
            <Icon width="28" fill={theme.colors.blue4} name="coin" />
            <div>
              <TopicTitle>Movimentações Mín.</TopicTitle>
              <TopicValue>{formatMoney(fund.fundo.aplicao_minima)}</TopicValue>
            </div>
          </Topic>
          <Topic>
            <Icon
              width="28"
              fill={theme.colors.blue4}
              name="monitoranalytics"
            />
            <div>
              <TopicTitle>Cotização/liquidação</TopicTitle>
              <TopicValue>{`${fund.fundo.aplicacao_cotizacao} ${fund.fundo.contagem_dias_resgate}`}</TopicValue>
            </div>
          </Topic>
        </TopicsContentRow>
        <BalanceAccordion
          id={fund.fundo.id_carteira}
          isOrangeArrow
          titleNode={
            <HeaderNodeBalanceAccordion>
              <Text>Saldo Bruto atual</Text>
              {getUpdatedBalance(fund)}
            </HeaderNodeBalanceAccordion>
          }
          gtmName="saldo bruto atual"
        >
          <CurrentBalance>
            <RowBankTransition>
              <BankTransitionDateWrapper>
                <Icon name="add" fill={theme.colors.green3} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  Saldo bruto
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                {formatMoney(calculatedBalance(fund).saldoBruto) || '--'}
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="4px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  Saldo bloqueado
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                {formatMoney(calculatedBalance(fund).saldoBloqueado) || '--'}
              </Text>
            </RowBankTransition>
            <RowBankTransition
              marginTop="4px"
              borderTop={`1px solid ${theme.colors.gray3}`}
            >
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                Saldo disponível
              </Text>
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                {formatMoney(calculatedBalance(fund).saldoDisponivel) || '--'}
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="14px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  IR*
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                {getTributacao(fund, 'IR')}
              </Text>
            </RowBankTransition>
            <RowBankTransition marginTop="4px">
              <BankTransitionDateWrapper>
                <Icon name="remove" fill={theme.colors.magenta2} width="16px" />
                <Text
                  fontSize="15px"
                  lineHeight="28px"
                  fontWeight="300"
                  margin="0 0 0 6px"
                >
                  IOF*
                </Text>
              </BankTransitionDateWrapper>
              <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                {getTributacao(fund, 'IOF')}
              </Text>
            </RowBankTransition>
            <RowBankTransition
              marginTop="7px"
              marginBottom="7px"
              borderTop={`1px solid ${theme.colors.gray3}`}
            >
              <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                Saldo líquido
              </Text>
              <Text fontSize="16px" lineHeight="24px" fontWeight="bold">
                {formatMoney(calculatedBalance(fund).saldoLiquido) || '--'}
              </Text>
            </RowBankTransition>
            <Text
              fontSize="12px"
              lineHeight="1.3"
              fontColor={theme.colors.gray5}
            >
              * Valores estimados
            </Text>
          </CurrentBalance>
        </BalanceAccordion>
        <GrossIncome>
          <Text>Rendimento Bruto</Text>
          <Text>{formatMoney(incomeValue)}</Text>
          <DropDown
            nodes={[renderSelectItems]}
            customWidth="auto"
            containerPadding="0px"
          >
            <SelectBox>
              {selectValue || 'Selecione'}
              <SelectIcon name="arrowdown" color="white" />
            </SelectBox>
          </DropDown>
        </GrossIncome>
        <ButtonWrapper>
          {fund.fundo.aplicao_liberada ? (
            <CustomConquistaButton
              loading={suitabilityIsLoading}
              loadingColor="white"
              data-gtm-name="investir"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleClickInvestButton()}
            >
              INVESTIR
            </CustomConquistaButton>
          ) : (
            <Popover
              content={() => (
                <Text type="body" color="gray5">
                  Fundo fechado para movimentações
                </Text>
              )}
            >
              <LockIcon />
            </Popover>
          )}
          <CustomConquistaButton
            loading={suitabilityIsLoading}
            data-gtm-name="resgatar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => handleClickRedeemButton()}
            outline
          >
            RESGATAR
          </CustomConquistaButton>
        </ButtonWrapper>
      </div>
    </>
  )
}

FundInformation.propTypes = {
  fund: PropTypes.shape({
    rendimentos: PropTypes.shape({
      rendimento: PropTypes.array,
    }),
    fundo: PropTypes.shape({
      aplicacao_cotizacao: PropTypes.string,
      apelido: PropTypes.string,
      id_carteira: PropTypes.string,
      perfil_risco: PropTypes.string,
      aplicao_minima: PropTypes.string,
      contagem_dias_resgate: PropTypes.string,
      aplicao_liberada: PropTypes.bool,
    }),
    saldo_atual: PropTypes.string,
    saldo_bloqueado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  idCotista: PropTypes.string.isRequired,
}
