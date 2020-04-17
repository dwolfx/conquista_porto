import React from 'react'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Text from 'components/Text'

import 'styled-components/macro'

import { useDispatch } from 'react-redux'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { TbodyTr, TbodyTd, InfoTableContent } from './styles'

const TableBody = ({
  isLoading,
  isError,
  rows,
  prepareRow,
  onChangeIsDrawerOpen,
  setIsOpenForInvestments,
  isFiltering,
}) => {
  const dispatch = useDispatch()

  const handleOpenDetail = idFundo => {
    dispatch(GetInvestmentDetailsRequest(idFundo))
    onChangeIsDrawerOpen(prevState => !prevState)
  }

  const TbodyRender = () => {
    if (isLoading) {
      return (
        <InfoTableContent>
          <td>
            <Loading
              type="bar"
              legend="Aguarde, estamos buscando suas informações..."
              widthBar="100%"
            />
          </td>
        </InfoTableContent>
      )
    }
    if (isError) {
      return (
        <InfoTableContent>
          <td>
            <Text
              type="headline"
              color="magenta2"
              css={`
                margin-bottom: 14px;
              `}
            >
              Não foi possível carregar suas informações de fundos de
              investimentos.
            </Text>
            <Button onClick={() => dispatch(GetInvestmentListRequest())}>
              Tentar novamente
            </Button>
          </td>
        </InfoTableContent>
      )
    }

    if (!rows || rows.length === 0) {
      return (
        <InfoTableContent>
          <td>
            <Text type="headline" color="gray5">
              {isFiltering
                ? 'Nenhum fundo de investimento encontrado com os filtros selecionados.'
                : 'No momento não possuímos nenhum fundo de investimento em nossa plataforma.'}
            </Text>
          </td>
        </InfoTableContent>
      )
    }

    return rows.map(row => {
      prepareRow(row)

      return (
        <TbodyTr
          {...row.getRowProps()}
          onClick={() => {
            handleOpenDetail(row.original.id_fundo)
            setIsOpenForInvestments(row.original.aplicao_liberada)
          }}
        >
          {row.cells.map(cell => (
            <TbodyTd
              borderRisk={cell.row.original.perfil_risco_ordem}
              width={cell.column.width}
              align={cell.column.align}
              {...cell.getCellProps()}
            >
              {cell.render('Cell')}
            </TbodyTd>
          ))}
        </TbodyTr>
      )
    })
  }

  return TbodyRender()
}

TableBody.propTypes = {
  setIsOpenForInvestments: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
}

export default TableBody
