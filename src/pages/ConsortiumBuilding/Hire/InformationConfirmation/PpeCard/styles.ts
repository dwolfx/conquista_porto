import styled from 'styled-components'
import Text from 'components/Text'
import Radio from 'components/Inputs/Radio'
import SelectComponent from 'components/Inputs/Select'

export const ContainerPpeCard = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(3)}`}px;
`

export const TextTitlePpeCard = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  max-width: 630px;
`

export const TextPpeCard = styled(Text).attrs(() => ({
  color: 'gray5',
  bold: true,
}))`
  max-width: 630px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const RadioOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: initial;
    align-items: center;
    justify-content: flex-start;
  }

  & label {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const RadioPpeCard = styled(Radio)``

export const DelimiterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const Select = styled(SelectComponent)``
