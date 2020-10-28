import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

import Text from 'components/Text'

import { useToast } from 'hooks/toast'
import FinancialApplication from 'pages/Investments/FinancialApplication'

import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { ISuitabilityInfo } from 'store/modules/SuitabilityInfo/types'

import * as s from './styles'
import { IProps, TSuitabilityData, IState } from './types'

export default function InvestLayer({ isOpen, handleClose, fund }: IProps) {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const modalSuitabilityInfoInitialState: TSuitabilityData = {
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
    isValid: false,
  }

  const [isAwareOfTerms, setIsAwareOfTerms] = useState(false)
  const [isInvestorLevelModalOpen, setIsInvestorLevelModalOpen] = useState(
    false
  )
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState<
    TSuitabilityData
  >(modalSuitabilityInfoInitialState)

  const { fundsList, suitabilityStore, financialApplication } = useSelector(
    (state: IState) => ({
      fundsList: state.investmentsList,
      suitabilityStore: state.suitabilityInfo,
      financialApplication: state.financialApplicationGetData,
    })
  )

  const triggerSuitabilityDispatch = useCallback(
    onSuccess => {
      if (!suitabilityStore.isLoading) {
        dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
      }
    },
    [addToast, dispatch, suitabilityStore.isLoading]
  )

  const triggerFinancialApplication = useCallback(
    (
      suitabilityData: TSuitabilityData,
      fundId: number,
      date: string,
      onSuccess?: (financialData: any) => void
    ) => {
      if (suitabilityData) {
        dispatch(
          GetFinancialApplicationDataRequest({
            data: {
              id_fundo: fundId,
              data_operacao: date,
            },
            onSuccess: data => {
              if (onSuccess) {
                onSuccess(data)
              }
            },
            onErrorToast: addToast,
          })
        )
      }
    },
    [dispatch, addToast]
  )

  const handleClickInvestButton = useCallback(
    (fundId: number, suitabilityData: TSuitabilityData & ISuitabilityInfo) => {
      if (!fundsList.data || !fundsList.data.length) {
        return null
      }

      const onSuccessFinancial = (financialData: any) => {
        if (suitabilityData && suitabilityData.isValid) {
          setIsAwareOfTerms(financialData.dados_para_aplicacao.aderente_fundo)

          // if fund return closed (fechado_aplicacao === true) and the operation date is the same as today,
          // do another request to financial application endpoint with the date of tomorrow (today date + 1), so that the API return the correct operation date.
          // TODO: remove this when the API returns correctly data_operacao value.
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
                .format('YYYY-MM-DD')
            )
          }
        }
      }

      setModalSuitabilityInfo({ ...suitabilityData })

      if (suitabilityData?.isValid) {
        const fundInfo = fundsList.data.filter(
          item => item.id_carteira === fund.fund_id
        )[0]

        const { fundForProfessionalInvestor, fundForQualifiedInvestor } = {
          fundForProfessionalInvestor: fundInfo?.fundo_investidor_profissional,
          fundForQualifiedInvestor: fundInfo?.fundo_investidor_qualificado,
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
    },
    [fundsList, triggerFinancialApplication, fund]
  )

  const initialTriggers = useCallback(() => {
    if (fundsList.data?.length) {
      if (!suitabilityStore.data) {
        const onSuccess = (
          onSuccessSuitabilityData: TSuitabilityData & ISuitabilityInfo
        ) => {
          handleClickInvestButton(fund.fund_id, onSuccessSuitabilityData)
        }
        triggerSuitabilityDispatch(onSuccess)
      } else {
        handleClickInvestButton(fund.fund_id, suitabilityStore.data)
      }
    }
  }, [
    fundsList.data,
    handleClickInvestButton,
    triggerSuitabilityDispatch,
    fund,
    suitabilityStore.data,
  ])

  useEffect(() => {
    if (!fundsList.data || !fundsList.data.length) {
      dispatch(GetInvestmentListRequest())
    }
  }, [fundsList.data, dispatch])

  useEffect(() => {
    initialTriggers()
  }, [initialTriggers])

  return (
    <>
      <s.Modal
        modalTitle={modalSuitabilityInfo.title}
        isOpen={modalSuitabilityInfo.isOpen || false}
        handleClose={() => {
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
          handleClose()
        }}
      >
        <Text type="headline" color="gray6">
          {modalSuitabilityInfo.description}
        </Text>
        <s.ModalButtonWrapper>
          {modalSuitabilityInfo.button && (
            <s.ModalButton
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
            </s.ModalButton>
          )}
        </s.ModalButtonWrapper>
      </s.Modal>
      <s.Modal
        modalTitle="Nível de investidor"
        isOpen={isInvestorLevelModalOpen}
        handleClose={() => setIsInvestorLevelModalOpen(false)}
      >
        <Text
          type="headline"
          color="gray6"
          css={`
            max-width: 362px;
          `}
        >
          Para investir, você precisa ter um nível mais avançado. Selecione
          outro fundo, por favor.
        </Text>
        <s.ModalButtonWrapper>
          <s.ModalButton
            data-gtm-subname="Modal nivel de investidor"
            data-gtm-name="ok"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => setIsInvestorLevelModalOpen(false)}
          >
            OK
          </s.ModalButton>
        </s.ModalButtonWrapper>
      </s.Modal>

      <FinancialApplication
        isOpen={isOpen}
        handleClose={handleClose}
        isAwareOfTerms={isAwareOfTerms}
        selectedFundId={fund.fund_id}
        isLoading={
          fundsList.isLoading ||
          suitabilityStore.isLoading ||
          financialApplication.isLoading
        }
        hasError={
          fundsList.isError ||
          suitabilityStore.hasError ||
          financialApplication.hasError
        }
        onError={() => {
          if (!fundsList.data?.length) {
            dispatch(GetInvestmentListRequest())
          } else {
            initialTriggers()
          }
        }}
      />
    </>
  )
}
