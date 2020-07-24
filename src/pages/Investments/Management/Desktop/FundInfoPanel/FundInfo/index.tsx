import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import moment from 'moment'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Dropdown from 'components/DropdownNew'
import { IModalProps } from 'pages/Investments/Management/types'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { IGetFinancialApplicationDataResponse } from 'store/modules/Investment/FinancialApplication/types'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import { GetRedeemRequest } from 'store/modules/Investment/Redeem/action'
import { useToast } from 'hooks/toast'

import { RISK_FILTER_TYPES } from '../../../types'
import { formatMoney } from 'helpers'

import {
  VerticalListStyled,
  AccordionContent,
  ColContent,
  RowLineInfo,
  RiskColorTag,
  RowAccordion,
  AccordionFundInfo,
  ColPadding,
  ColIncome,
  HorizontalListWithLine,
  ButtonContent,
  DropdownLineContent,
  ButtonCustom,
  ButtonsWrapper,
  CustomPopover,
  LockIcon,
} from './styles'

export const months = [
  {
    name: 'Último Mês',
    value: 0,
  },
  {
    name: '12 meses',
    value: 1,
  },
  {
    name: '24 meses',
    value: 2,
  },
  {
    name: '36 meses',
    value: 3,
  },
]

interface IValidProps {
  isValid: boolean
}

interface ITributacao {
  tipo: string
  valor: string
}

interface IBalance {
  valorsaldo: string
  data: string
}

interface IIncome {
  datainicio: string
  datafim: string
  meses: string
  valorrendimento: string
}

interface IFundInformationProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
  position: {
    fundo: {
      apelido: string
      perfil_risco: string
      perfil_risco_ordem: string
      aplicao_minima: string
      aplicacao_cotizacao: string
      contagem_dias_resgate: string
      id_carteira: string
      nome_gestor: string
      resgate_liberado: boolean
    }
    saldo_atual: string
    saldo_bloqueado: string
    tributacoes: {
      tributacao: ITributacao[]
    }
    historico_saldos_fundo: {
      saldos: {
        saldo: IBalance[] | IBalance
      }
    }
    rendimentos: {
      rendimento: IIncome[]
    }
    idCotista: string
    categoria_arena: string
  }
  setLayerOpen: (isLayerOpen: boolean) => void
  setIsAwareOfTerms: (isAwareOfTerms: boolean) => void
  setIsInvestorLevelModalOpen: (isInvestorLevelModalOpen: boolean) => void
}

const FundInformation = ({
  position,
  onChangeModalSuitabilityInfo,
  setLayerOpen,
  setIsAwareOfTerms,
  setIsInvestorLevelModalOpen,
}: IFundInformationProps) => {
  const themeContext = useContext(ThemeContext)

  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [investButtonIsLoading, setInvestButtonIsLoading] = useState<boolean>(
    false
  )
  const [incomeValue, setIncomeValue] = useState<any | null>(null)
  const [selectValue, setSelectValue] = useState('')

  const {
    displayInformation,
    financialApplicationLoading,
    funds,
    fundsError,
    idFund,
    isRedeemLoading,
    fundsIsLoading,
    suitabilityIsLoading,
    suitabilityStoreData,
  } = useSelector((state: any) => ({
    displayInformation: state.investmentPosition.displayInformation,
    financialApplicationLoading: state.financialApplicationGetData.isLoading,
    funds: state.investmentsList.data,
    fundsError: state.investmentsList.isError,
    fundsIsLoading: state.investmentsList.isError,
    suitabilityIsLoading: state.suitabilityInfo.isLoading,
    suitabilityStoreData: state.suitabilityInfo.data,
    idFund: state.investmentPosition.idFund,
    isRedeemLoading: state.redeemData.isLoading,
  }))

  const borderRiskNumber = parseInt(position.fundo.perfil_risco_ordem, 10)

  useFetchInvestmentsList()

  useEffect(() => {
    if (
      !suitabilityIsLoading &&
      !financialApplicationLoading &&
      !fundsIsLoading
    ) {
      setInvestButtonIsLoading(false)
    }
  }, [suitabilityIsLoading, financialApplicationLoading, fundsIsLoading])

  useEffect(() => {
    setIncomeValue(
      position.rendimentos.rendimento[months[0].value].valorrendimento
    )
    setSelectValue(months[0].name)
  }, [position])

  const getTributacao = (tipoTributacao = '', moneyFormatted = true) => {
    const valorTributacao = position.tributacoes
      ? position.tributacoes.tributacao.find(
          t => t.tipo === tipoTributacao.toUpperCase()
        )
      : 0
    if (!moneyFormatted) {
      return valorTributacao && (parseFloat(valorTributacao.valor) || 0)
    }
    return valorTributacao ? formatMoney(valorTributacao.valor) : '--'
  }

  const calculatedBalance = () => {
    const iof = getTributacao('IOF', false) || 0
    const ir = getTributacao('IR', false) || 0

    const tributacaoSum = +iof + +ir

    const saldoBruto = parseFloat(position.saldo_atual)
      ? parseFloat(position.saldo_atual)
      : 0
    const saldoBloqueado = parseFloat(position.saldo_bloqueado)
      ? parseFloat(position.saldo_bloqueado)
      : 0
    const saldoDisponivel = saldoBruto - saldoBloqueado
    const saldoLiquido = saldoDisponivel - tributacaoSum

    return {
      saldoBruto,
      saldoBloqueado,
      saldoDisponivel,
      saldoLiquido,
    }
  }

  const getUpdatedBalance = () => {
    let lastBalance = position.historico_saldos_fundo.saldos.saldo
    if (Array.isArray(lastBalance)) {
      lastBalance = lastBalance[lastBalance.length - 1]
    }
    return {
      valorsaldo: lastBalance ? formatMoney(lastBalance.valorsaldo) : '--',
      data: lastBalance ? moment(lastBalance.data).format('DD/MM/YYYY') : '--',
    }
  }

  const handleSelectChange = (item: any) => {
    setSelectValue(item.name)
    setIncomeValue(
      position.rendimentos.rendimento[months[item.value].value].valorrendimento
    )
  }

  const triggerSuitabilityDispatch = (onSuccess: null | Function) => {
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  const triggerFinancialApplication = (
    suitabilityData: any,
    fundId: string,
    date: string,
    onSuccess: (data: IGetFinancialApplicationDataResponse) => void
  ) => {
    if (suitabilityData) {
      dispatch(
        GetFinancialApplicationDataRequest({
          data: {
            id_fundo: fundId,
            data_operacao: date,
          },
          onSuccess,
          onErrorToast: addToast,
        })
      )
    }
  }

  const handleClickInvestButton = (
    fundId: string,
    suitabilityData: any,
    fundsResponse: any
  ) => {
    const onSuccessFinancial = (
      financialData: IGetFinancialApplicationDataResponse
    ) => {
      if (suitabilityData && suitabilityData.isValid) {
        dispatch(GetInvestmentDetailsRequest(fundId))

        setIsAwareOfTerms(financialData.dados_para_aplicacao.aderente_fundo)

        if (
          financialData.dados_para_aplicacao.fechado_aplicacao &&
          moment(financialData.dados_para_aplicacao.data_operacao).isSame(
            moment().format('YYYY-MM-DD')
          )
        ) {
          triggerFinancialApplication(
            suitabilityData,
            fundId,
            moment()
              .add(1, 'day')
              .format('YYYY-MM-DD'),
            () => {
              setLayerOpen(true)
            }
          )
        } else {
          setLayerOpen(true)
        }
      }
    }

    onChangeModalSuitabilityInfo({ ...suitabilityData })

    if (suitabilityData && suitabilityData.isValid) {
      const fundInfo = fundsResponse.filter(
        (fund: { id_fundo: string }) => fund.id_fundo === fundId
      )
      const { fundForProfessionalInvestor, fundForQualifiedInvestor } = {
        fundForProfessionalInvestor: fundInfo[0].fundo_investidor_profissional,
        fundForQualifiedInvestor: fundInfo[0].fundo_investidor_qualificado,
      }

      const { professionalInvestor, qualifiedInvestor } = {
        professionalInvestor: suitabilityData.investidor_profissional,
        qualifiedInvestor: suitabilityData.investidor_qualificado,
      }
      if (
        (qualifiedInvestor === 'S' && fundForProfessionalInvestor === 'N') ||
        professionalInvestor === 'S' ||
        (fundForProfessionalInvestor === 'N' &&
          fundForQualifiedInvestor === 'N')
      ) {
        triggerFinancialApplication(
          suitabilityData,
          fundId,
          moment().format('YYYY-MM-DD'),
          onSuccessFinancial
        )
      } else {
        setIsInvestorLevelModalOpen(true)
      }
    }
  }

  const onChangeLayerOpen = (fundId: string) => {
    const onSuccessInvestmentList = (fundsResponse: any) => {
      if (!suitabilityStoreData || !suitabilityStoreData.isValid) {
        const onSuccess = (onSuccessSuitabilityData: Object) => {
          handleClickInvestButton(
            fundId,
            onSuccessSuitabilityData,
            fundsResponse
          )
        }
        triggerSuitabilityDispatch(onSuccess)
      } else {
        handleClickInvestButton(fundId, suitabilityStoreData, fundsResponse)
      }
    }

    if (fundsError || !funds) {
      dispatch(
        GetInvestmentListRequest({
          onSuccess: onSuccessInvestmentList,
          onErrorToast: addToast,
        })
      )
    }

    if (funds.length > 0) {
      onSuccessInvestmentList(funds)
    }
  }

  const handleClickRedeemButton = () => {
    const onSuccess = (modalProps: IModalProps | IValidProps) => {
      onChangeModalSuitabilityInfo({ ...modalProps } as IModalProps)

      if ((modalProps as IValidProps).isValid) {
        dispatch(
          GetRedeemRequest({
            data_operacao: moment(new Date(), 'DD/MM/YYYY').format(
              'YYYY-MM-DD'
            ),
            id_fundo: idFund,
            valor: '1000',
            onErrorToast: addToast,
          })
        )
      }
    }
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'resgatar', addToast))
  }

  function renderSelectItems(closeFunc: Function) {
    const handleClick = (item: any) => {
      handleSelectChange(item)
      closeFunc()
    }

    const nodes = months.map(item => (
      <DropdownLineContent key={item.name} onClick={() => handleClick(item)}>
        <Text type="headline" bold color="gray6">
          {item.name}
        </Text>
      </DropdownLineContent>
    ))

    return nodes
  }

  return (
    <>
      <RowLineInfo alignItems="center">
        <Col col={4}>
          <ColContent>
            <RiskColorTag borderRisk={borderRiskNumber} />
            <VerticalList
              elements={[
                <Text type="captionUppercase" bold color="gray4">
                  Perfil de Risco
                </Text>,
                <Text type="headline" bold color="gray6">
                  {
                    RISK_FILTER_TYPES[
                      position.fundo
                        .perfil_risco as keyof typeof RISK_FILTER_TYPES
                    ]
                  }
                </Text>,
              ]}
            />
          </ColContent>
        </Col>
        <Col col={4}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" bold color="gray4">
                Movimentação Mín.
              </Text>,
              <Text type="headline" bold color="gray6">
                {formatMoney(position.fundo.aplicao_minima)}
              </Text>,
            ]}
          />
        </Col>
        <Col col={4}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" bold color="gray4">
                Resgate (Cotização)
              </Text>,
              <Text type="headline" bold color="gray6">
                {`${position.fundo.aplicacao_cotizacao} (${position.fundo.contagem_dias_resgate})`}
              </Text>,
            ]}
          />
        </Col>
      </RowLineInfo>
      <AccordionFundInfo
        triggerCloseOnArrow
        openByDefault={false}
        bodyPadding="0"
        titleNode={
          <RowAccordion alignItems="center">
            <Col col={4}>
              <VerticalListStyled
                elements={[
                  <Text type="headline" bold color="gray5">
                    Saldo e rendimento bruto
                  </Text>,
                  <Text type="caption" bold color="gray6">
                    Atualizado em {getUpdatedBalance().data}
                  </Text>,
                ]}
              />
            </Col>
            <ColIncome col={4}>
              <Text
                type="headline"
                bold
                color="gray6"
                css={`
                  -webkit-text-security: ${displayInformation
                    ? 'disc'
                    : 'none'};
                `}
              >
                {getUpdatedBalance().valorsaldo}
              </Text>
            </ColIncome>
          </RowAccordion>
        }
      >
        <AccordionContent>
          <VerticalList
            elements={[
              <HorizontalList
                startItems={[
                  <Text type="body" color="gray5">
                    Saldo Bruto
                  </Text>,
                ]}
                endItems={[
                  <Text
                    type="body"
                    color="gray5"
                    css={`
                      -webkit-text-security: ${displayInformation
                        ? 'disc'
                        : 'none'};
                    `}
                  >
                    {formatMoney(calculatedBalance().saldoBruto) || '--'}
                  </Text>,
                ]}
              />,
              <HorizontalList
                startItems={[
                  <Text type="body" color="gray5">
                    IOF*
                  </Text>,
                ]}
                endItems={[
                  <Text
                    type="body"
                    color="gray5"
                    css={`
                      -webkit-text-security: ${displayInformation
                        ? 'disc'
                        : 'none'};
                    `}
                  >
                    {getTributacao('IOF')}
                  </Text>,
                ]}
              />,
              <HorizontalList
                startItems={[
                  <Text type="body" color="gray5">
                    IR*
                  </Text>,
                ]}
                endItems={[
                  <Text
                    type="body"
                    color="gray5"
                    css={`
                      -webkit-text-security: ${displayInformation
                        ? 'disc'
                        : 'none'};
                    `}
                  >
                    {getTributacao('IR')}
                  </Text>,
                ]}
              />,
              <HorizontalListWithLine
                startItems={[
                  <Text type="headline" bold color="gray6">
                    Saldo Líquido
                  </Text>,
                ]}
                endItems={[
                  <Text
                    type="headline"
                    color="gray6"
                    css={`
                      -webkit-text-security: ${displayInformation
                        ? 'disc'
                        : 'none'};
                    `}
                  >
                    {formatMoney(calculatedBalance().saldoLiquido)}
                  </Text>,
                ]}
              />,
              <Text color="gray5">
                O saldo refere-se a data exibida e será atualizado no decorrer
                do dia. Resgates parciais poderão ser convertidos em totais,
                caso resulte em saldo inferior ao valor mínimo de permanência,
                conforme disposto nas regras de movimentação deste fundo.
              </Text>,
            ]}
          />
        </AccordionContent>
      </AccordionFundInfo>
      <RowLineInfo alignItems="center">
        <Col col={4}>
          <Text
            type="headline"
            bold
            color="gray5"
            css={`
              margin-left: 7px;
            `}
          >
            Rendimento Bruto
          </Text>
        </Col>
        <ColPadding col={4}>
          <Text
            type="headline"
            bold
            color="gray6"
            css={`
              -webkit-text-security: ${displayInformation ? 'disc' : 'none'};
            `}
          >
            {formatMoney(incomeValue) || '--'}
          </Text>
        </ColPadding>
        <Col col={4}>
          <Dropdown
            nodes={[renderSelectItems]}
            title="Outros Objetivos"
            containerPadding="14px 0"
            openingSide="left"
            disabled={false}
          >
            <ButtonContent>
              <div>
                <Text type="captionUppercase" bold color="blue4">
                  {selectValue}
                </Text>
              </div>
              <div className="icon">
                <Icon
                  name="calendar"
                  fill={themeContext.colors.blue4}
                  width={21}
                />
              </div>
            </ButtonContent>
          </Dropdown>
        </Col>
      </RowLineInfo>
      <Row justifyContent="center">
        <ButtonsWrapper xlAuto lgAuto mdAuto smAuto>
          {!position.fundo.resgate_liberado ? (
            <CustomPopover
              content="Fundo fechado para resgates"
              placement="left"
              tooltip
            >
              <LockIcon />
            </CustomPopover>
          ) : (
            <ButtonCustom
              data-gtm-subname="painel de informações de fundo"
              data-gtm-name="resgatar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="primary"
              outline={true}
              onClick={handleClickRedeemButton}
            >
              Resgatar
            </ButtonCustom>
          )}
          <ButtonCustom
            loading={investButtonIsLoading}
            loadingColor="white"
            data-gtm-subname="painel de informações de fundo"
            data-gtm-name="investir"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={() => {
              onChangeLayerOpen(position.fundo.id_carteira)
              setInvestButtonIsLoading(true)
            }}
          >
            Investir
          </ButtonCustom>
        </ButtonsWrapper>
      </Row>
    </>
  )
}

export default FundInformation
