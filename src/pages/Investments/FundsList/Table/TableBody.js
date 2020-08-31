import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import { useDispatch } from 'react-redux'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { TbodyTr, TbodyTd } from './styles'

const TableBody = ({
  rows,
  prepareRow,
  onChangeIsFundDetailOpen,
  setIsOpenForInvestments,
}) => {
  const dispatch = useDispatch()

  const handleOpenDetail = idFundo => {
    dispatch(GetInvestmentDetailsRequest(idFundo))
    onChangeIsFundDetailOpen(prevState => !prevState)
  }

  const TbodyRender = () =>
    rows.map(row => {
      prepareRow(row)
      return (
        <TbodyTr
          {...row.getRowProps()}
          onClick={() => {
            handleOpenDetail(row.original.id_fundo)
            setIsOpenForInvestments(row.original.aplicao_liberada)
          }}
          data-testid="fund-row"
        >
          {row.cells.map(cell => {
            const styles = cell.column.styles || cell.column
            return (
              <TbodyTd
                borderRisk={cell.row.original.perfil_risco_ordem}
                width={styles.width}
                minWidth={styles.minWidth}
                align={cell.column.align}
                {...cell.getCellProps()}
              >
                {cell.render('Cell')}
              </TbodyTd>
            )
          })}
        </TbodyTr>
      )
    })

  return TbodyRender()
}

TableBody.propTypes = {
  setIsOpenForInvestments: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
}

export default TableBody
