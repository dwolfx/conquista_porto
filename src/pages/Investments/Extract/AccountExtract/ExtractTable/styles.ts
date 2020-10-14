import styled from 'styled-components'
import HorizontalList from 'components/HorizontalList'
import Card from 'components/Card'

import TableComp from 'components/Table'
import Text from 'components/Text'

export const Table = styled(TableComp)`
  height: 100%;
`
export const StyledDate = styled(Text).attrs(({
  type: "body",
  color: "gray5"
}))`
  padding: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`};
`

export const BoldText = styled(Text).attrs(({
  type: "title",
  color: "gray6",
  bold: true,
}))`
  text-transform: capitalize;
`

export const StyledHorizontalList = styled(HorizontalList)`
  height: ${({theme}) => theme.spacing(4)}px;
`

export const StyledCard = styled(Card)`
  & + & {
    margin-top: ${({theme}) => theme.spacing(2)}px
  }
  margin-left: 7px;
  margin-right: 7px;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;

  button {
    width: 100%;
  }
`

export const StyledErrorOrLoadingCard = styled(Card)`
  height: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.spacing(6)}px;

  > div {
    flex: unset;
  }

  p {
    width: 75%;
    margin: ${({ theme }) => `0 auto ${theme.spacing(1)}px`};
  }

  button {
    width: 70%;
    margin: 0 auto;
  }
`
