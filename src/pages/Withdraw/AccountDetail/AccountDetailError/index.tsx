import React from 'react'
import Button from 'components/Button'
import * as S from './styles'

interface IProps {
  onClick: () => void
}

export default function AccountDetailError({ onClick }: IProps) {
  return (
    <S.Container>
      <S.TextStyled type="headline" color="magenta2" textAlign="center">
        Não foi possível carregar
        <br />
        suas informações.
      </S.TextStyled>
      <Button onClick={onClick}>Tentar novamente</Button>
    </S.Container>
  )
}
