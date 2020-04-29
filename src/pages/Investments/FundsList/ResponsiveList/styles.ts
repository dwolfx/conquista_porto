import styled from 'styled-components'

import TextComponent from 'components/Text'

export const ListWrapper = styled.div`
  margin-top: ${props => props.theme.spacing(2)}px;
  padding: 0 7px;
`

interface ILoadingContent {
  errorType?: boolean
}

export const WrapperContent = styled.div<ILoadingContent>`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  margin: 14px 0;
  padding: 0 49px;
  text-align: center;
  ${props => props.errorType && `flex-direction: column;`}
`

export const ErrorText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  margin-bottom: ${props => props.theme.spacing(2)}px;
`

export const EmptyDataText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray5',
}))``
