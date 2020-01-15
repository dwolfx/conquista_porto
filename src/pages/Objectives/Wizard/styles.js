import styled from 'styled-components'
import Text from 'components/Text'

export const Wizard = styled.div``

export const Container = styled.div``

export const WizardContainer = styled.div`
  padding: 0 1rem;
  width: 100%;
`

export const WizardButtom = styled.footer`
  display: flex;
  justify-content: center;
  & > button:nth-child(2) {
    margin-left: 7px;
  }
`
export const ScreenAlignment = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 100px);
`

export const Question = styled(Text).attrs({ type: 'heading4' })`
  min-height: 66px;
  text-align: center;
  text-transform: none;
`

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  margin: 4rem auto;
`
