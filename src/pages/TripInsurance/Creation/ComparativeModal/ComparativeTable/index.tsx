import React from 'react'
import { uuid } from 'uuidv4'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'

import * as s from './styles'

interface IComparativeTable {
  travelPlans: IPlan[]
}

const ComparativeTable: React.FC<IComparativeTable> = ({
  travelPlans,
  ...rest
}) => {
  const renderTableRowContent = (travelPlans: IPlan[]) => {
    const tableRowsData: Array<string[]> = []

    travelPlans.forEach((plan, index) => {
      if (index === 0) {
        // adiciona o valor da coluna 'COBERTURA' e do primeiro plano
        plan.ViagemCobertura.coberturas.forEach(item => {
          tableRowsData.push([item.descricao, item.valor])
        })
      }
      // adiciona o valor dos demais planos na linha
      plan.ViagemCobertura.coberturas.forEach((item, index) => {
        tableRowsData[index] = [...tableRowsData[index], item.valor]
      })
    })

    return tableRowsData.map(rowData => (
      <s.Tr key={uuid()}>
        <s.Td>
          <s.FirstCellText>{rowData[0]}</s.FirstCellText>
        </s.Td>
        {travelPlans.map((_, index) => (
          <s.Td key={uuid()}>
            <s.CellText>{rowData[index + 1]}</s.CellText>
          </s.Td>
        ))}
      </s.Tr>
    ))
  }

  const renderTable = () => (
    <s.Table {...rest}>
      <s.Thead>
        <s.Tr>
          <s.Th>
            <s.TableFirstHeaderText>COBERTURA</s.TableFirstHeaderText>
          </s.Th>
          {travelPlans.map(plan => (
            <s.Th key={uuid()}>
              <s.TableHeaderText>
                {plan.nomePlano.toUpperCase()}
              </s.TableHeaderText>
            </s.Th>
          ))}
        </s.Tr>
      </s.Thead>
      <tbody>{renderTableRowContent(travelPlans)}</tbody>
    </s.Table>
  )

  return travelPlans.length > 0 ? renderTable() : null
}

export default ComparativeTable
