import React, { useState, useCallback } from 'react'

import Drawer from 'components/Drawer'
import Table from 'components/Table/TableWithCheckbox'
import Text from 'components/Text'
import { IFunds } from 'store/modules/Objective/types'

import { columns } from './constants'
import * as s from './styles'

type TRemoved = IFunds[] | []

interface IProps {
  removedFunds: TRemoved
  restoreFunds: (selectedIds: number[]) => void
  isOpen: boolean
  setIsOpen: (openState: boolean) => void
}

const RemovedFundsDrawer = ({
  removedFunds,
  restoreFunds,
  isOpen,
  setIsOpen,
}: IProps) => {
  const [selectedFunds, setSelectedFunds] = useState<IFunds[]>([])

  const onSelectCallback = useCallback(rows => setSelectedFunds(rows), [
    setSelectedFunds,
  ])

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

  return (
    <Drawer
      isOpen={isOpen}
      size="md"
      handleClose={() => setIsOpen(false)}
      drawerTitle="Fundos recomendados removidos"
      footer={
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
      }
    >
      {renderDrawerContent()}
    </Drawer>
  )
}

export default RemovedFundsDrawer
