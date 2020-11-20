import React from 'react'
import Button from 'components/Button'
import * as S from './styles'

export default function BottomNavigationContent() {
  return (
    <S.Content data-testid="bottomNavigationContent">
      <Button outline={true}>Início</Button>
      <Button outline={true}>Funil de vendas</Button>
    </S.Content>
  )
}
