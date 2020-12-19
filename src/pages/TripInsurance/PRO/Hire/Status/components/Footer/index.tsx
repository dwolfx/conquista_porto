import React from 'react'
import Button from 'components/Button'
import * as S from './styles'

export default function BottomNavigationContent() {
  return (
    <S.Content data-testid="footer">
      <Button outline>Início</Button>
      <Button outline>Funil de vendas</Button>
    </S.Content>
  )
}
