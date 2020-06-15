import styled, { css } from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import InputText from 'components/NewInput'
import { Input, ErrorMessage } from 'components/NewInput/styles'
import { RadioWrapper } from 'components/Inputs/Radio/styles'
import { Col as ColBootstrap, Row } from 'styled-bootstrap-grid'

interface IWizard {
  name: string
}

const hasRadioStyle = css`
  ${RadioWrapper} {
    align-items: flex-start;
    max-width: 330px;
    margin: 0 auto;
  }
`

export const Wizard = styled.div`
  background-color: ${props => props.theme.colors.white};
`

export const Container = styled.div``

export const WizardStep = styled.div<IWizard>`
  padding: ${({ theme }) => `0 ${theme.spacing(1)}px`};
  width: 100%;

  ${props => props.name === 'is_easy_to_save_planned_amount' && hasRadioStyle}
`

export const WizardButton = styled.div`
  display: flex;
  justify-content: center;
  & > button:nth-child(2) {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`
export const RowFull = styled(Row as any)`
  padding: ${({ theme }) => `0 ${theme.spacing(1)}px`};
  justify-content: center;
  width: 100%;
  margin: 0;
`

export const ButtonAction = styled(Button)`
  width: 100%;
`

export const Question = styled(Text).attrs(() => ({ type: 'heading4' }))`
  text-align: center;
  text-transform: none;
`

export const RuleText = styled(Text).attrs(() => ({ type: 'body' }))`
  text-align: center;
`

export const DescriptionText = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.black};
  }
`

export const ColQuestion = styled(ColBootstrap as any)`
  min-height: 90px;
`

export const BodyWizard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 151px);
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.colors.grayblue1};
  padding: ${props => props.theme.spacing(2)}px
    ${props => props.theme.spacing(4)}px;
`

export const InputRow = styled(Row as any)`
  width: 100%;
`

export const InputWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(6)}px auto;

  ${ErrorMessage} {
    bottom: auto;
    position: absolute;
    top: ${({ theme }) => `calc(100% - ${theme.spacing(1)}px)`};
  }
`

export const Form = styled.form`
  width: 100%;
`

export const Col = styled(ColBootstrap as any)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    display: flex;
    justify-content: center;
  }
`

export const NicknameCol = styled(Col as any)`
  position: absolute;
  text-align: center;
  width: 100%;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`

export const FormCol = styled(Col as any)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const InputNickname = styled(InputText)`
  ${Input} {
    ::-webkit-input-placeholder {
      color: ${props => props.theme.colors.gray5};
    }
  }
`

export const SuggestionTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;

  button {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`
