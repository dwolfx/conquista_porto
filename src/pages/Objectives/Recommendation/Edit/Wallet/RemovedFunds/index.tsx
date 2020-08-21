import React, { useState, useCallback } from 'react'

import Drawer from 'components/Drawer'
import Modal from 'components/Modal/ModalNew'
import Table from 'components/Table/TableWithCheckbox'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import { IFunds } from 'store/modules/Objective/types'

import { columns } from './constants'
import { IRemovedProps } from './types'
import * as s from './styles'

const RemovedFundsDrawer = ({
  removedFunds,
  restoreFunds,
  isOpen,
  setIsOpen,
}: IRemovedProps) => {
  const componentTitle = 'Fundos recomendados removidos'
  const isDesktop = useMedia('mdUp')

  const [selectedFunds, setSelectedFunds] = useState<IFunds[]>([])

  const onSelectCallback = useCallback(rows => setSelectedFunds(rows), [
    setSelectedFunds,
  ])

  const handleClose = () => setIsOpen(false)

  const renderDrawerContent = () => {
    if (!removedFunds.length) {
      return (
        <s.EmptyStateContainer>
          <Text color="gray5" bold>
            Nenhum fundo recomendado removido.
          </Text>
        </s.EmptyStateContainer>
      )
    }

    return (
      <Table
        data={removedFunds}
        columns={columns}
        onSelect={onSelectCallback}
      />
    )
  }

  const Footer = () => (
    <s.Button
      color="secondary"
      disabled={removedFunds.length > 0 && selectedFunds.length === 0}
      onClick={() => {
        if (!removedFunds.length) {
          setIsOpen(false)
        } else {
          const selectedIds = selectedFunds.reduce(
            (acc: any, cur: IFunds) => [...acc, cur.fund_id],
            []
          )
          restoreFunds(selectedIds)
        }
      }}
    >
      {removedFunds.length ? 'Adicionar novamente' : 'Voltar'}
    </s.Button>
  )

  return isDesktop ? (
    <Drawer
      isOpen={isOpen}
      size="md"
      handleClose={handleClose}
      drawerTitle={componentTitle}
      footer={<Footer />}
    >
      {renderDrawerContent()}
    </Drawer>
  ) : (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      modalTitle={componentTitle}
      footer={<Footer />}
    >
      {renderDrawerContent()}
    </Modal>
  )
}

export default RemovedFundsDrawer
