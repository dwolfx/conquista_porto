import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'styled-components/macro'

import Modal from 'components/Modal/ModalNew'
import Card from 'components/Card'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import Text from 'components/Text'
import useSelectedPosition from 'hooks/useSelectedPosition'
import useMedia from 'hooks/useMedia'

import CardHeaderTitle from '../components/CardHeaderTitle'
import ChartPosition from '../components/ChartPosition'
import InvestedFundsList from '../components/InvestedFundsList'
import InvestorAccount from '../components/InvestorAccount'
import InvestorAccountMobile from './InvestorAccountMobile'
import FinancialApplication from '../../FinancialApplication'
import LastTransations from '../components/LastTransactions'
import { IModalProps, TFundsLayout } from '../types'

import FundInfoPanel from './FundInfoPanel'
import DrawerFilter from './DrawerFilter'
import {
  RowContent,
  LeftContent,
  FloatButton,
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

const Tablet: React.FC<IProps> = ({
  filters,
  viewMode,
  filteredInvestedFunds,
  onHandleChangeFilter,
  onHandleChangeView,
}: IProps) => {
  const dispatch = useDispatch()
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState<IModalProps>(
    modalSuitabilityInfoInitialState
  )
  const [isFundDetailOpen, setIsFundDetailOpen] = useState<boolean>(false)

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false)
  const position = useSelectedPosition()
  const isMobile = useMedia('xs')

  const { isLoading, hasError } = useSelector((state: any) => ({
    isLoading: state.investmentPosition.isLoading,
    hasError: state.investmentPosition.hasError,
  }))

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

  const handleOpenDetailFund = () => {
    dispatch(GetInvestmentDetailsRequest(position.id))
    setIsFundDetailOpen(true)
  }

  const handleFundDetailClose = () => {
    setIsFundDetailOpen(false)
  }

  return (
    <>
      <RowContent>
        <LeftContent data-testid="left-content" md={4} sm={5} xs={12}>
          <ChartPosition />
          {isMobile ? <InvestorAccountMobile /> : <InvestorAccount />}
        </LeftContent>
        <MainContent data-testid="main-content" md={8} sm={7} xs={12}>
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
                headerTitle={position?.apelido}
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
      {isMobile ? (
        <FundDetailModal
          title={position?.apelido}
          category={position?.categoria_arena}
          isOpenForInvestments={true}
          isOpen={isFundDetailOpen}
          isLayerOpen={true}
          handleLayerOpen={handleFundDetailClose}
          handleClose={handleFundDetailClose}
        />
      ) : (
        <FundDetailDrawer
          isOpen={isFundDetailOpen}
          handleClose={handleFundDetailClose}
          handleLayerOpen={handleFundDetailClose}
          isLayerOpen={true}
        />
      )}
      {!isLoading && !hasError && (
        <FloatButton
          color="primary"
          onClick={() => setIsFilterDrawerOpen(true)}
          size="large"
          icon="filter"
        />
      )}
      <DrawerFilter
        filters={filters}
        viewMode={viewMode}
        onHandleChangeView={onHandleChangeView}
        isDrawerOpen={isFilterDrawerOpen}
        onChangeIsDrawerOpen={setIsFilterDrawerOpen}
        onHandleChangeFilter={onHandleChangeFilter}
      />
    </>
  )
}

export default Tablet
