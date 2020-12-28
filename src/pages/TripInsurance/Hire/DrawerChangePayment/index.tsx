import Drawer from 'components/Drawer'
import React from 'react'

import * as tSelect from 'components/Inputs/Select/types'
import * as S from 'pages/TripInsurance/Hire/CompanionStep/EditDrawer/styles'
import useMedia from 'hooks/useMedia'
import * as s from './styles'
import * as t from './types'

import SelectPayMethod from './SelectPayMethod'
import SelectQuotaNumber from './SelectQuotaNumber'

const selected: tSelect.TSelected = {
  id: 0,
}

const paymentType: tSelect.TOptions[] = [
  {
    id: 1,
    text: 'Porto Seguro Black **** 8899',
  },
]

const numberQuota: tSelect.TOptions[] = [
  {
    id: 1,
    text: '12x de R$ 310,00',
  },
]

const DrawerChangePayment: React.FC<t.IDrawerChangePayment> = ({
  isOpen,
  handleClose,
}: t.IDrawerChangePayment) => {
  const isMobileOrTablet = useMedia('sm')

  const footerButton = () => (
    <s.Button
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-name="salvar alterações"
    >
      SALVAR ALTERAÇÕES
    </s.Button>
  )

  const renderContent = () => (
    <s.Container>
      <SelectPayMethod
        label="Forma de Pagamento"
        paymentType={paymentType}
        selected={selected}
      />
      <SelectQuotaNumber
        numberQuota={numberQuota}
        selected={selected}
        label="Número de Parcelas"
      />
    </s.Container>
  )

  if (isMobileOrTablet) {
    return (
      <S.Modal
        modalTitle="Alterar dados"
        isOpen={isOpen}
        handleClose={handleClose}
        footer={footerButton()}
      >
        {renderContent()}
      </S.Modal>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      handleClose={handleClose}
      drawerTitle="Alterar dados"
      footer={footerButton()}
    >
      {renderContent()}
    </Drawer>
  )
}

export default DrawerChangePayment
