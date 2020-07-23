import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useToast } from 'hooks/toast'

import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { GetFinancialApplicationDataRequest } from 'store/modules/Investment/FinancialApplication/action'
import { IGetFinancialApplicationDataResponse } from 'store/modules/Investment/FinancialApplication/types'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'

import { ButtonBlock, IconButoon } from './styles'

import 'styled-components/macro'

interface IButtonInvest {
  id: number
  name: string
  is_fund_active?: boolean
}

interface IModalProps {
  isOpen: boolean
  title: string
  description: string
  button: {
    buttonName: string
    dataGtmName: string
    dataGtmType: string
    dataGtmClicktype: string
    handleClick: any
  }
}

interface IButtonProps {
  fund: IButtonInvest
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
  setLayerOpen: (isLayerOpen: boolean) => void
  setIsAwareOfTerms: (isAwareOfTerms: boolean) => void
  setIsInvestorLevelModalOpen: (isInvestorLevelModalOpen: boolean) => void
  setSelectedFundId: (id: string) => void
}

const ButtonInvest = ({
  fund,
  onChangeModalSuitabilityInfo,
  setLayerOpen,
  setIsAwareOfTerms,
  setIsInvestorLevelModalOpen,
  setSelectedFundId,
}: IButtonProps) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const {
    financialApplicationLoading,
    funds,
    fundsError,
    fundsIsLoading,
    suitabilityIsLoading,
    suitabilityStoreData,
  } = useSelector((state: any) => ({
    financialApplicationLoading: state.financialApplicationGetData.isLoading,
    funds: state.investmentsList.data,
    fundsError: state.investmentsList.isError,
    fundsIsLoading: state.investmentsList.isError,
    suitabilityIsLoading: state.suitabilityInfo.isLoading,
    suitabilityStoreData: state.suitabilityInfo.data,
  }))

  const [investButtonLoading, setInvestButtonLoading] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  useFetchInvestmentsList()

  useEffect(() => {
    if (isClicked) {
      setInvestButtonLoading(true)
    }

    if (
      !suitabilityIsLoading &&
      !financialApplicationLoading &&
      !fundsIsLoading
    ) {
      setInvestButtonLoading(false)
    }
  }, [
    suitabilityIsLoading,
    financialApplicationLoading,
    fundsIsLoading,
    isClicked,
  ])

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

  return (
    <>
      <ButtonBlock
        disabled={!fund.is_fund_active}
        loading={investButtonLoading}
        loadingColor="white"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname={fund.name}
        data-gtm-name="Investir"
        onClick={() => {
          onChangeLayerOpen(fund.id.toString())
          setSelectedFundId(fund.id.toString())
          setIsClicked(true)
        }}
      >
        <>
          {!fund.is_fund_active && (
            <IconButoon name="lock2" color="gray4" width="22" />
          )}
          Investir
        </>
      </ButtonBlock>
    </>
  )
}

export default ButtonInvest
