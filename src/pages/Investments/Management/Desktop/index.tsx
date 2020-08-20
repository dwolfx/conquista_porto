import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'styled-components/macro'

import Modal from 'components/Modal/ModalNew'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import Card from 'components/Card'
import Text from 'components/Text'
import useSelectedPosition from 'hooks/useSelectedPosition'

import CardHeaderTitle from '../components/CardHeaderTitle'
import ChartPosition from '../components/ChartPosition'
import FinancialApplication from '../../FinancialApplication'
import InvestorAccount from '../components/InvestorAccount'
import InvestedFundsList from '../components/InvestedFundsList'
import LastTransations from '../components/LastTransactions'

import { IModalProps, TFundsLayout } from '../types'
import FundInfoPanel from './FundInfoPanel'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import {
  RowContent,
  LeftContent,
  MainContent,
  ModalButtonWrapper,
  ModalButton,
} from './styles'

export const modalSuitabilityInfoInitialState: IModalProps = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: null,
  },
}

interface IProps {
  filters: string[] | []
  viewMode: TFundsLayout
  filteredInvestedFunds: any[]
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

const Desktop: React.FC<IProps> = ({
  filters,
  viewMode,
  filteredInvestedFunds,
  onHandleChangeView,
  onHandleChangeFilter,
}) => {
  const dispatch = useDispatch()
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState<IModalProps>(
    modalSuitabilityInfoInitialState
  )
  const [isFundDetailOpen, setIsFundDetailOpen] = useState<boolean>(false)

  const [isLayerOpen, setLayerOpen] = useState<boolean>(false)
  const [selectedFundId, setSelectedFundId] = useState<number>(0)
  const [isAwareOfTerms, setIsAwareOfTerms] = useState<boolean>(false)
  const [isInvestorLevelModalOpen, setIsInvestorLevelModalOpen] = useState(
    false
  )

  const { idFund } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
  }))

  useEffect(() => {
    setSelectedFundId(idFund)
  }, [selectedFundId, idFund])

  const position = useSelectedPosition()

  const handleOpenDetailFund = () => {
    dispatch(GetInvestmentDetailsRequest(position.id))
    setIsFundDetailOpen(true)
  }

  return (
    <>
      <RowContent>
        <LeftContent xl={3}>
          <ChartPosition />
          <InvestorAccount />
        </LeftContent>
        <MainContent xl={9}>
          <InvestedFundsList
            filters={filters}
            filteredFunds={filteredInvestedFunds}
            viewMode={viewMode}
            isNextPriorButtonsVisible
            onHandleChangeFilter={onHandleChangeFilter}
            onHandleChangeView={onHandleChangeView}
          />
          <Card
            headerTitle={
              <CardHeaderTitle
                headerTitle={position?.fundo?.apelido}
                onHandleClick={handleOpenDetailFund}
              />
            }
          >
            <FundInfoPanel
              onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
              setLayerOpen={setLayerOpen}
              setIsAwareOfTerms={setIsAwareOfTerms}
              setIsInvestorLevelModalOpen={setIsInvestorLevelModalOpen}
              isInvestorLevelModalOpen={isInvestorLevelModalOpen}
            />
            <LastTransations />
          </Card>
        </MainContent>
      </RowContent>
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
        <Text type="headline" color="gray6">
          {modalSuitabilityInfo.description}
        </Text>
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
      <Modal
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
        <ModalButtonWrapper>
          <ModalButton
            data-gtm-subname="Modal nivel de investidor"
            data-gtm-name="ok"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => setIsInvestorLevelModalOpen(false)}
          >
            OK
          </ModalButton>
        </ModalButtonWrapper>
      </Modal>
      {isLayerOpen && idFund && (
        <FinancialApplication
          isAwareOfTerms={isAwareOfTerms}
          isOpen={isLayerOpen}
          handleClose={() => {
            setLayerOpen(false)
            setSelectedFundId(0)
          }}
          selectedFundId={selectedFundId}
          handleFundDetailOpen={() => setIsFundDetailOpen(true)}
        />
      )}
      <FundDetailDrawer
        isOpen={isFundDetailOpen}
        handleClose={() => setIsFundDetailOpen(false)}
        handleLayerOpen={() => setIsFundDetailOpen(false)}
        isLayerOpen={true}
      />
    </>
  )
}

export default Desktop
