import styled from 'styled-components'
import { Container, Col as ColComponent } from 'styled-bootstrap-grid'
import Text from 'components/Text'
import Button from 'components/Button'
import { CardHeader } from 'components/Card/styles'
import CardComponent from 'components/Card'
import SelectComponent from 'components/Inputs/Select'
import DataShower from 'pages/CreditCard/Creation/SummaryStep/DataShower'
import RadioComponent from 'components/Inputs/Radio/New'
import NewInput from 'components/NewInput'
import IconExporter from 'components/IconExporter'
import CEPInput from 'components/Inputs/CEPInput'
import CheckboxComponent from 'components/Inputs/Checkbox'
import WarningFlagCmp from '../../commons/WarningFlag'

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}`}px;
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const Col = styled(ColComponent)`
  padding: 0;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const TitleText = styled(Text)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    text-align: center;
    &:last-child {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }
  }
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    text-align: left;
  }
`

export const Card = styled(CardComponent)`
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}`}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  ${CardHeader} {
    border-bottom: 0;
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    padding: ${({ theme }) => theme.spacing(5)}px;
  }
`

export const CardTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  align-items: center;
`

export const CardTitleText = styled(Text)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: auto;
  }
`

export const DataDisplay = styled(DataShower)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`

export const Select = styled(SelectComponent)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px;
`

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const RadioOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Radio = styled(RadioComponent)`
  margin-right: ${({ theme }) => theme.spacing(4)}px;
  &:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Icon = styled(IconExporter)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  height: 21px;
  width: 21px;
`

export const InputCEP = styled(CEPInput)`
  margin: 0px ${({ theme }) => theme.spacing(2)}px;
`

export const LinkCEPWrapper = styled.div`
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    display: flex;
    flex-direction: row-reverse;
  }
`

export const LinkCEP = styled(Text)`
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}`}px;
`

export const TextInput = styled(NewInput)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px 0px;
  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const AddressText = styled(Text)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0px;
    &:last-of-type {
      margin-top: 0px;
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const TextWithBottomMargin = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const RadioContainerPPE = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0px`};
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const TextHiringTerms = styled(Text)`
  margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0px`};
`

export const WrapperHiringTerms = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing(1)}px;

  &:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const CheckboxInputWrapper = styled.div`
  position: relative;
`

export const Checkbox = styled(CheckboxComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const NextButton = styled(Button)`
  width: 100%;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 133px;
  }
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
  justify-content: flex-end;
`

export const EmergencyContactWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
    flex-direction: row;
  }
`

export const EmergencyContactTextInput = styled(NewInput)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px 0px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 410px;
  }
`

export const TextInputContainer = styled.div`
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const WarningFlag = styled(WarningFlagCmp)``