import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Settings } from 'react-slick'
import { ThemeContext } from 'styled-components'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Dropdown from 'components/DropdownNew'
import Carousel from 'components/Carousel'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import {
  IModalProps,
  RISK_FILTER_TYPES,
} from 'pages/Investments/Management/types'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { IGetFinancialApplicationDataResponse } from 'store/modules/Investment/FinancialApplication/types'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetIncomesDataRequest } from 'store/modules/Investment/Income/action'
import IIncome from 'store/modules/Investment/Income/iIncomes'
import { GetRedeemRequest } from 'store/modules/Investment/Redeem/action'

import { formatMoney } from 'helpers'

import {
  VerticalListStyled,
  AccordionContent,
  ColContent,
  RowLineInfo,
  RiskColorTag,
  RowWithoutPadding,
  AccordionFundInfo,
  HorizontalListWithLine,
  ButtonContent,
  DropdownLineContent,
  ButtonCustom,
  ButtonsWrapper,
  CaroselContent,
  LockIcon,
  CustomPopover,
  ButtonClosed,
} from './styles'
import moment from 'moment'

export const months = [
  {
    name: 'Último Mês',
    compactName: 'Últ. M',
    value: 1,
  },
  {
    name: '12 meses',
    compactName: '12 M',
    value: 12,
  },
  {
    name: '24 meses',
    compactName: '24 M',
    value: 24,
  },
  {
    name: '36 meses',
    compactName: '36 M',
    value: 36,
  },
]

interface IRiskMap {
  [key: number]: string
}

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
  position: {
    fundo: string
    id_cotista: string
    categoria_arena: string
    perfil_risco: string
    perfil_risco_ordem: number
    aplicao_minima: number
    aplicacao_cotizacao?: string
    contagem_dias_resgate: string
    id: number
    nome_gestor: string
    saldo_bruto: string
    valor_ir: string
    valor_iof: string
    saldo_liquido: string
    data_historico_formatada: string
    resgate_liberado: boolean
    resgate_cotizacao: string
    aplicao_liberada: boolean
  }
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
  const isVerticalTablet = useMedia('md')
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
    idFund,
    funds,
    fundsError,
    suitabilityStoreData,
    isRedeemLoading,
    incomeIsLoading,
    income,
  } = useSelector((state: any) => ({
    displayInformation: state.investmentPosition.displayInformation,
    idFund: state.investmentPosition.idFund,
    funds: state.investmentsList.data,
    fundsError: state.investmentsList.isError,
    suitabilityStoreData: state.suitabilityInfo.data,
    isRedeemLoading: state.redeemData.isLoading,
    incomeIsLoading: state.income.isLoading,
    income: state.income.data,
  }))

  const borderRiskNumber = position.perfil_risco_ordem

  const getMonth = (mes: number) => {
    let result = income.find((element: IIncome) => element.meses === mes)
    return result || {}
  }

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
      const fundInfo = fundsResponse.filter(
        (fund: { id_carteira: number }) => fund.id_carteira === fundId
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
          {isVerticalTablet ? item.compactName : item.name}
        </Text>
      </DropdownLineContent>
    ))

    return nodes
  }

  const customSettings: Settings = {
    dots: true,
    arrows: false,
    slidesToScroll: 2,
    slidesToShow: 1,
    variableWidth: true,
    infinite: false,
  }

  return (
    <>
      <CaroselContent>
        <Carousel data-testid="test-carousel" settings={customSettings}>
          <div>
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
          </div>
          <ColContent>
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
          </ColContent>
          <ColContent>
            <VerticalList
              elements={[
                <Text type="captionUppercase" bold color="gray4">
                  Resgate (Cotização)
                </Text>,
                <Text type="headline" bold color="gray6">
                  {`${position.resgate_cotizacao} (${position.contagem_dias_resgate})`}
                </Text>,
              ]}
            />
          </ColContent>
        </Carousel>
      </CaroselContent>

      <AccordionFundInfo
        triggerCloseOnArrow
        openByDefault={false}
        bodyPadding="0"
        titleNode={
          <RowWithoutPadding alignItems="center">
            <Col col={10}>
              <VerticalListStyled
                elements={[
                  <Text type="captionUppercase" bold color="gray4">
                    Saldo e rendimento bruto
                  </Text>,
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
                  </Text>,
                  <Text type="caption" bold color="gray6">
                    Atualizado em {position.data_historico_formatada}
                  </Text>,
                ]}
              />
            </Col>
          </RowWithoutPadding>
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
                    {position.saldo_bruto || '--'}
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
        <Col col={8}>
          <VerticalListStyled
            elements={[
              <Text type="captionUppercase" bold color="gray4">
                Rendimento Bruto
              </Text>,
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
                {formatMoney(incomeValue) || '--'}
              </Text>,
            ]}
          />
        </Col>
        <Col col={4}>
          <Dropdown
            nodes={[renderSelectItems]}
            title="Outros Objetivos"
            containerPadding="14px 0"
            customWidth={isVerticalTablet ? '102px' : '180px'}
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
      <RowWithoutPadding justifyContent="center">
        <ButtonsWrapper>
          {!position.resgate_liberado ? (
            <CustomPopover
              content="Fundo fechado para resgates"
              placement="bottom"
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
              placement="bottom"
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
      </RowWithoutPadding>
    </>
  )
}

export default FundInformation
