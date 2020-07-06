import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSelectedPosition from 'hooks/useSelectedPosition'
import Modal from 'components/Modal/Confirmation'
import Card from 'components/Card'
import ChartPosition from '../components/ChartPosition'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import Detail from '../../FundsList/Detail'
import LastTransations from '../components/LastTransactions'
import InvestorAccount from '../components/InvestorAccount'
import InvestedFundsList from '../components/InvestedFundsList'
import { IModalProps, TFundsLayout } from '../types'
import FundInfoPanel from './FundInfoPanel'
import { RowContent, LeftContent, MainContent, FloatButton } from './styles'
import DrawerFilter from './DrawerFilter'

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
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState<IModalProps>(
    modalSuitabilityInfoInitialState
  )
  const dispatch = useDispatch()
  const [isFundDetailOpen, setIsFundDetailOpen] = useState<boolean>(false)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false)
  const position = useSelectedPosition()

  const { isLoading, hasError } = useSelector((state: any) => ({
    isLoading: state.investmentPosition.isLoading,
    hasError: state.investmentPosition.hasError,
  }))

  const handleOpenDetailFund = () => {
    dispatch(GetInvestmentDetailsRequest(position.fundo.id_carteira))
    setIsFundDetailOpen(true)
  }

  const getFundTitle = () => {
    if (isLoading || hasError) {
      return null
    }
    return position && position.fundo && position.fundo.apelido
  }

  return (
    <>
      <RowContent>
        <LeftContent data-testid="left-content" md={4} sm={5} xs={12}>
          <ChartPosition />
          <InvestorAccount
            onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
          />
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
            headerTitle={getFundTitle()}
            headerIconInfo={!isLoading}
            headerIconInfoClick={handleOpenDetailFund}
            headerIconInfoMsg="Mais informações"
          >
            <FundInfoPanel
              onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
            />
            <LastTransations />
          </Card>
        </MainContent>
      </RowContent>
      <Modal
        title={modalSuitabilityInfo.title}
        description={modalSuitabilityInfo.description}
        isOpen={modalSuitabilityInfo.isOpen}
        buttonTextCancel="Cancelar"
        buttonTextConfirm={modalSuitabilityInfo.button.buttonName}
        onClose={() =>
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
        }
        onConfirmation={() => modalSuitabilityInfo.button.handleClick()}
      ></Modal>
      <Detail
        isOpen={isFundDetailOpen}
        handleClose={() => setIsFundDetailOpen(false)}
        handleLayerOpen={() => setIsFundDetailOpen(false)}
        isLayerOpen={true}
      />
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
