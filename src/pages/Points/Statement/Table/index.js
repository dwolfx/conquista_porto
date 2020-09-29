/* eslint-disable no-param-reassign */
import React, { useMemo, useReducer } from 'react'
import { TableWrapper, TableTabs, TableTab } from './styles'
import {
  statementColumns,
  statementData,
  accumulatorColumns,
  accumulatorData,
} from './mocks'
import TableRender from '../../../../components/TableParati'

const reducerstateTab = (stateInner, activeKey) =>
  Object.keys(stateInner).reduce(
    (cur, key) => ({
      ...cur,
      [key]: key === activeKey ? 'active' : '',
    }),
    {}
  )

export default function StatementTable() {
  const [stateTab, setCurrentTab] = useReducer(reducerstateTab, {
    accumulatorClass: '',
    statementClass: 'active',
  })

  const columnsMock = useMemo(
    () =>
      stateTab.statementClass === 'active'
        ? statementColumns
        : accumulatorColumns,
    [stateTab]
  )
  const dataMock = useMemo(
    () =>
      stateTab.statementClass === 'active' ? statementData : accumulatorData,
    [stateTab]
  )

  return (
    <TableWrapper>
      <TableTabs>
        <TableTab
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="extrato de pontos"
          data-gtm-name="extrato"
          onClick={() => setCurrentTab('statementClass')}
          className={stateTab.statementClass}
        >
          Extrato
        </TableTab>
        <TableTab
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="extrato de pontos"
          data-gtm-name="acumulo de pontos"
          onClick={() => setCurrentTab('accumulatorClass')}
          className={stateTab.accumulatorClass}
        >
          Acúmulo de pontos
        </TableTab>
      </TableTabs>
      <TableRender columns={columnsMock} data={dataMock} />
    </TableWrapper>
  )
}
