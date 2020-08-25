import React from 'react'
import moment from 'moment'

import 'styled-components/macro'

import Text from 'components/Text'

import { formatMoney } from 'helpers'

import { TableStyled, TableRow } from './styles'

import ITransaction from 'store/modules/Investment/LastTransaction/iTransaction'

interface IProps {
  data: ITransaction[]
}

const Table = ({ data, ...rest }: IProps) => (
  <TableStyled {...rest}>
    <tbody>
      {data.map((item: any) => (
        <TableRow
          key={item.id_operacao}
          data-testid={item.id_operacao.toString()}
        >
          <td
            css={`
              width: 100px;
            `}
          >
            <Text type="body" color="gray5" bold>
              {moment(item.data_operacao).format('DD/MM/YYYY')}
            </Text>
          </td>
          <td>
            <Text type="body" color="gray5" bold>
              {item.tipo_operacao}
            </Text>
          </td>
          <td
            css={`
              width: 130px;
              text-align: right;
            `}
          >
            <Text type="title" color="gray6" bold>
              {formatMoney(item.valor_bruto)}
            </Text>
          </td>
        </TableRow>
      ))}
    </tbody>
  </TableStyled>
)

export default Table
