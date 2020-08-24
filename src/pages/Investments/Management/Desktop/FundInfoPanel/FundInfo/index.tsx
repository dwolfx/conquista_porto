import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import LoadingIcon from 'components/Loading'

import Dropdown from 'components/Dropdown'
import { IModalProps } from 'pages/Investments/Management/types'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { IGetFinancialApplicationDataResponse } from 'store/modules/Investment/FinancialApplication/types'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetIncomesDataRequest } from 'store/modules/Investment/Income/action'
import IIncome from 'store/modules/Investment/Income/iIncomes'
import { useToast } from 'hooks/toast'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import { GetRedeemRequest } from 'store/modules/Investment/Redeem/action'
import { formatMoney } from 'helpers'
import { RISK_FILTER_TYPES } from '../../../types'

import { IFund } from 'store/modules/Investment/Position/iPositions'

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
  LoadingContent,
  CustomPopover,
  LockIcon,
  ButtonClosed,
} from './styles'
import moment from 'moment'

export const months = [
  {
    name: 'Último Mês',
    value: 1,
  },
  {
    name: '12 meses',
    value: 12,
  },
  {
    name: '24 meses',
    value: 24,
  },
  {
    name: '36 meses',
    value: 36,
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

interface IFundInformationProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
  position: IFund
  setLayerOpen: (isLayerOpen: boolean) => void
  setIsAwareOfTerms: (isAwareOfTerms: boolean) => void
  setIsInvestorLevelModalOpen: (isInvestorLevelModalOpen: boolean) => void
  isInvestorLevelModalOpen: boolean
}

const FundInformation = ({
  position,
  onChangeModalSuitabilityInfo,
  setLayerOpen,
  setIsAwareOfTerms,
  setIsInvestorLevelModalOpen,
  isInvestorLevelModalOpen,
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
    fundsIsLoading,
    suitabilityIsLoading,
    suitabilityStoreData,
    isRedeemLoading,
    incomeIsLoading,
    income,
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
    incomeIsLoading: state.income.isLoading,
    income: state.income.data,
  }))

  const borderRiskNumber = position.perfil_risco_ordem

  useFetchInvestmentsList()

  useEffect(() => {
    if (
      (!suitabilityIsLoading &&
        !financialApplicationLoading &&
        !fundsIsLoading) ||
      isInvestorLevelModalOpen ||
      suitabilityStoreData?.isOpen
    ) {
      setInvestButtonIsLoading(false)
    }
  }, [
    suitabilityIsLoading,
    financialApplicationLoading,
    fundsIsLoading,
    isInvestorLevelModalOpen,
    suitabilityStoreData,
  ])

  useEffect(() => {
    dispatch(GetIncomesDataRequest(position.id))
  }, [position, dispatch])

  useEffect(() => {
    if (!incomeIsLoading && income) {
      setIncomeValue(getMonth(months[0].value).rendimento)
      setSelectValue(months[0].name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income, incomeIsLoading])

  const handleSelectChange = (item: any) => {
    setSelectValue(item.name)
    setIncomeValue(getMonth(item.value).rendimento)
  }

  const triggerSuitabilityDispatch = (onSuccess: null | Function) => {
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  const getMonth = (mes: number) => {
    let result = income.find((element: IIncome) => element.meses === mes)

    return result || {}
  }

  const triggerFinancialApplication = (
    suitabilityData: any,
    fundId: number,
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
    fundId: number,
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
      const fundInfo = fundsResponse.filter((fund: { id_carteira: number }) => {
        return fund.id_carteira === fundId
      })
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

  const onChangeLayerOpen = (fundId: number) => {
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
            data_operacao: moment().format('YYYY-MM-DD'),
            id_fundo: idFund,
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
                      position.perfil_risco as keyof typeof RISK_FILTER_TYPES
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
                {formatMoney(position.aplicao_minima)}
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
                {position.resgate_cotizacao}
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
                    {`Atualizado em ${position.data_historico_formatada}`}
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
                {position.saldo_bruto}
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
                    {position.saldo_bruto}
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
                    {position.valor_iof}
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
                    {position.valor_ir}
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
                    {position.saldo_liquido}
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
          {incomeIsLoading ? (
            <LoadingContent>
              <LoadingIcon type="spinner" color="blue4" />
            </LoadingContent>
          ) : (
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
          )}
        </ColPadding>
        <Col col={4}>
          <Dropdown
            nodes={[renderSelectItems]}
            title="Outros Objetivos"
            containerPadding="14px 0"
            openingSide="left"
            disabled={incomeIsLoading}
          >
            <ButtonContent>
              {incomeIsLoading ? (
                <div className="icon">
                  <LoadingIcon type="spinner" color="blue4" />
                </div>
              ) : (
                <>
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
                </>
              )}
            </ButtonContent>
          </Dropdown>
        </Col>
      </RowLineInfo>
      <Row justifyContent="center">
        <ButtonsWrapper xlAuto lgAuto mdAuto smAuto>
          {!position.resgate_liberado ? (
            <CustomPopover
              content="Fundo fechado para resgates"
              placement="left"
              tooltip
            >
              <ButtonClosed
                data-gtm-subname="painel de informações de fundo"
                data-gtm-name="resgatar fechado"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              >
                <LockIcon />
                Resgatar
              </ButtonClosed>
            </CustomPopover>
          ) : (
            <ButtonCustom
              data-gtm-subname="painel de informações de fundo"
              data-gtm-name="resgatar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="primary"
              loading={isRedeemLoading}
              disabled={isRedeemLoading}
              outline={true}
              onClick={handleClickRedeemButton}
            >
              Resgatar
            </ButtonCustom>
          )}
          {!position.aplicao_liberada ? (
            <CustomPopover
              content="Fundo fechado para aplicação"
              placement="right"
              tooltip
            >
              <ButtonClosed
                data-gtm-subname="painel de informações de fundo"
                data-gtm-name="investir fechado"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              >
                <LockIcon />
                Investir
              </ButtonClosed>
            </CustomPopover>
          ) : (
            <ButtonCustom
              loading={investButtonIsLoading}
              loadingColor="white"
              data-gtm-subname="painel de informações de fundo"
              data-gtm-name="investir"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="secondary"
              onClick={() => {
                onChangeLayerOpen(position.id)
                setInvestButtonIsLoading(true)
              }}
            >
              Investir
            </ButtonCustom>
          )}
        </ButtonsWrapper>
      </Row>
    </>
  )
}

export default FundInformation
