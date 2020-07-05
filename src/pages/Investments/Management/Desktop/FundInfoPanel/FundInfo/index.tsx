import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Dropdown from 'components/DropdownNew'
import LoadingIcon from 'components/Loading'

import { IModalProps } from 'pages/Investments/Management/types'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetIncomesDataRequest } from 'store/modules/Investment/Income/action'
import IIncome from 'store/modules/Investment/Income/iIncomes'
import { useToast } from 'hooks/toast'

import { formatMoney, handleGiwRedirect } from 'helpers'

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
} from './styles'

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

export const riskMap: IRiskMap = {
  20: 'Baixo',
  18: 'Médio-baixo',
  19: 'Médio',
  16: 'Médio-alto',
  17: 'Alto',
}

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
    perfil_risco: number
    aplicao_minima: number
    aplicacao_cotizacao?: string
    contagem_dias_resgate: string
    id: number
    nome_gestor: string
    saldo_bruto?: string
    valor_ir: string
    valor_iof: string
    saldo_liquido: string
    data_historico_formatada: string
    dias_conversao_resgate: number
  }
}

const FundInformation = ({
  position,
  onChangeModalSuitabilityInfo,
}: IFundInformationProps) => {
  const themeContext = useContext(ThemeContext)
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [incomeValue, setIncomeValue] = useState<any | null>(null)
  const [selectValue, setSelectValue] = useState('')

  const { displayInformation, incomeIsLoading, income } = useSelector(
    (state: any) => ({
      displayInformation: state.investmentPosition.displayInformation,
      incomeIsLoading: state.income.isLoading,
      income: state.income.data,
    })
  )

  const borderRiskNumber = position.perfil_risco

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

  const getGiwPath = (type: string) => {
    const paths: {
      [key: string]: string
    } = {
      investir: 'aplicacao',
      resgatar: 'resgate',
    }

    return paths[type]
  }

  const getMonth = (mes: number) => {
    let result = income.find((element: IIncome) => element.meses === mes)

    return result || {}
  }

  const buildGiwUrl = (action: string) => {
    return `portaldecliente/conquista/${getGiwPath(action)}?idFundo=${
      position.id
    }&id_cotista=${position.id_cotista}&nomeFundo=${position.fundo}&tipoFundo=${
      position.categoria_arena
    }&brand=${position.nome_gestor}&r=true`
  }

  const handleClickInvestButton = () => {
    const onSuccess = (modalProps: IModalProps | IValidProps) => {
      onChangeModalSuitabilityInfo({ ...modalProps } as IModalProps)

      if ((modalProps as IValidProps).isValid) {
        handleGiwRedirect(buildGiwUrl('investir'))
      }
    }

    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  const handleClickRedeemButton = () => {
    const onSuccess = (modalProps: IModalProps | IValidProps) => {
      onChangeModalSuitabilityInfo({ ...modalProps } as IModalProps)

      if ((modalProps as IValidProps).isValid) {
        handleGiwRedirect(buildGiwUrl('resgatar'))
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
                  {riskMap[position.perfil_risco]}
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
                {`${position.dias_conversao_resgate} (${position.contagem_dias_resgate})`}
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
          <ButtonCustom
            data-gtm-subname="painel de informações de fundo"
            data-gtm-name="investir"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={handleClickInvestButton}
          >
            Investir
          </ButtonCustom>
        </ButtonsWrapper>
      </Row>
    </>
  )
}

export default FundInformation
