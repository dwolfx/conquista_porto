import React from 'react'

import { Container, ListItem } from './styles'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import moment from 'moment'

type DataObject = {
  id_operacao: string
  data_operacao: string
  tipo_operacao: string
  valor_bruto: string
}

interface IProps {
  data: DataObject[]
}

const List = ({ data, ...rest }: IProps) => {
  return (
    <Container>
      {data.map((item: any, index: number) => (
        <ListItem key={item.id_operacao} data-testid={item.id_operacao}>
          <HorizontalList
            startItems={[
              <Text type="captionUppercase" color="gray6" bold>
                data
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {moment(item.data_operacao).format('DD/MM/YYYY')}
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="captionUppercase" color="gray6" bold>
                valor
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {formatMoney(item.valor_bruto)}
              </Text>,
            ]}
          />
          <HorizontalList
            startItems={[
              <Text type="captionUppercase" color="gray6" bold>
                status
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {item.tipo_operacao}
              </Text>,
            ]}
          />
        </ListItem>
      ))}
    </Container>
  )
}

export default List
