import React from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import DataShower from '../DataShower'
import * as S from './styles'

const CardData = () => {
  const cardData = {
    flag: 'Mastercard',
    dueDate: '131.507.476-19',
  }

 return (
   <S.StyledCard
     headerTitle={<Text type="subheading" bold color="gray5">DADOS DO CARTÃO</Text>}
     headerEndItem={<Button><Text bold type="button" color="blue4">Alterar</Text></Button>}
   >
     <S.Wrapper>
       <DataShower label="Bandeira" value={cardData.flag} />
       <Divisor />
       <DataShower label="Vencimento da fatura" value={cardData.dueDate} />
     </S.Wrapper>
   </S.StyledCard>
 )
}

export default CardData
