import styled from 'styled-components'
import theme from '../../styles/theme'

export const WarningWrapper = styled.div`
  border: 3px solid ${props => props.theme.colors.gray3};
  margin-bottom: 30px;
  padding: 30px 30px 23px;
`

export const WarningContentWrapper = styled.div`
  display: flex;
`

export const WarningContent = styled.div`
  width: 83.33%;
`

export const WarningIcon = styled.div`
  flex: 1;
  padding-right: 14px;
  display: flex;
  justify-content: center;
`

export const WarningTitle = styled.div`
  font-family: ${theme.fontFamily};
  font-size: 22px;
  color: ${props => props.theme.colors.black};
  margin-bottom: 15px;
`

export const WarningText = styled.div`
  font-family: ${theme.fontFamily};
  color: ${props => props.theme.colors.black};
  font-size: 14px;
  margin-bottom: 0;
`

export const WarningButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
