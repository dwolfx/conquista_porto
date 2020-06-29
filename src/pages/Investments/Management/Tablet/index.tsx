import React, { useState } from 'react'

import Modal from 'components/Modal/Confirmation'

import { RowContent, LeftContent, MainContent } from './styles'
import InvestorAccount from 'pages/Investments/Management/components/InvestorAccount'
import { IModalProps, TFundsLayout } from '../types'

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
  return (
    <>
      <RowContent>
        <LeftContent data-testid="left-content" md={4} sm={5}>
          <InvestorAccount
            onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
          />
        </LeftContent>
        <MainContent data-testid="main-content" md={8} sm={7}>
          CONTENT
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
    </>
  )
}

export default Tablet
