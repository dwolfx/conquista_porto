import styled from 'styled-components'
import MiniLinearProgressBarCmp from 'components/MiniLinearProgressBar'
import CardCmp from 'components/Card'

export const MiniLinearProgressBar = styled(MiniLinearProgressBarCmp)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
export const Card = styled(CardCmp)`
  height: 100%;
`
