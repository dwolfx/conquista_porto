import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useSelectedPosition from 'hooks/useSelectedPosition'

import Modal from 'components/Modal/Confirmation'
import Card from 'components/Card'
import Detail from '../../FundsList/Detail'

import { RowContent, LeftContent, MainContent } from './styles'
import InvestorAccount from '../components/InvestorAccount'
import InvestedFundsList from '../components/InvestedFundsList'
import { IModalProps, TFundsLayout } from '../types'

import FundInfoPanel from './FundInfoPanel'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

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
  const position = useSelectedPosition()

  const handleOpenDetailFund = () => {
    dispatch(GetInvestmentDetailsRequest(position.fundo.id_carteira))
    setIsFundDetailOpen(true)
  }

  return (
    <>
      <RowContent>
        <LeftContent data-testid="left-content" md={4} sm={5}>
          <InvestorAccount
            onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
          />
        </LeftContent>
        <MainContent data-testid="main-content" md={8} sm={7}>
          <InvestedFundsList
            filters={filters}
            filteredFunds={filteredInvestedFunds}
            viewMode={viewMode}
            isNextPriorButtonsVisible
            onHandleChangeFilter={onHandleChangeFilter}
            onHandleChangeView={onHandleChangeView}
          />
          <Card
            headerTitle={position && position.fundo && position.fundo.apelido}
            headerIconInfo
            headerIconInfoClick={handleOpenDetailFund}
            headerIconInfoMsg="Mais informações"
          >
            <FundInfoPanel
              onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
            />
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
    </>
  )
}

export default Tablet
