import styled from 'styled-components'
import Text from 'components/Text'
import LoadingComponent from 'components/Loading'
import NewInput from 'components/NewInput'
import IconExporter from 'components/IconExporter'
import SelectComponent from 'components/Inputs/Select'

export const LinkCEPWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
  display: flex;
  flex-direction: column-reverse;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: row-reverse;
    margin: ${({ theme }) => theme.spacing(1)}px 0 0 0;
    justify-content: space-between;
    align-items: center;
  }
`

export const CEPNotFoundWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}`}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    display: flex;
    flex-direction: column;
    margin-right: 0;
  }
`

export const CEPStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0;
  }
`

export const Loading = styled(LoadingComponent)`
  height: 28px;
`

export const LoadingWrapper = styled.div`
  width: 28px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const AddressWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0;
  }
`

export const AddressInput = styled(NewInput)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const TextInput = styled(NewInput)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  &:last-of-type {
    margin-bottom: 0px;
  }
`

export const NeighbourhoodInput = styled(NewInput)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: 0;
  }
`

export const CityInput = styled(NewInput)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: 0;
  }
`

export const NotFoundIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const NotFoundIcon = styled(IconExporter)`
  width: 16px;
  height: 16px;
`

export const NotFoundMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  justify-content: space-between;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0;
  }
`

export const ManualFillCard = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px 0px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.14);
  border-radius: 8px;
  transform: rotate(0.25deg);

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
    max-width: 410px;
  }
`

export const ManualFillCardText = styled(Text)`
  max-width: 199px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    max-width: 347px;
  }
`

export const ManualFillIconWrapper = styled.div`
  width: 21px;
  height: 21px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const ManualFillIcon = styled(IconExporter)`
  width: 21px;
  height: 21px;
`

export const ManualFillCardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ManualFillTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  justify-content: space-between;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    padding-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ManualFillText = styled(Text)`
  width: 167px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: auto;
  }
`

export const Select = styled(SelectComponent)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const NumberComplementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: row;
  }
`

export const TextInputNumber = styled(NewInput)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px 0px;
  width: 192px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const TextInputComplement = styled(NewInput)`
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin: ${({ theme }) =>
      `${theme.spacing(4)}px 0px ${theme.spacing(4)}px ${theme.spacing(2)}px`};
    width: 410px;
  }
`

export const CityText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0;
  }
`
