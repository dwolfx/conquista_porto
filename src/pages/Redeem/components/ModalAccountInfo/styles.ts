import styled from 'styled-components'
import Text from 'components/Text'

export const SectionContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const Title = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const TitleHowToInvest = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const WrapperAccountValue = styled.div`
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(1)}px`};
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
`

export const ContainerBox = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px ${theme.spacing(3)}px`};
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
`

export const WrapperHowToInvest = styled.div`
  max-width: 650px;
  display: flex;
`

export const TableBox = styled.div`
  min-width: 33%;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const ModalTextWrapper = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px 0;
`

export const ContainerAccountInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`
