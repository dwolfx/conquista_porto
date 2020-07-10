import styled, { css } from 'styled-components'

import TextComponent from 'components/Text'

interface IFiltersInfoContainer {
  hidden: boolean
}

export const FiltersInfoContainer = styled.div<IFiltersInfoContainer>`
  width: 100%;
  right: 0px;
  top: 73px;
  z-index: 1;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`

export const FiltersInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(2)}px;
`

interface ListWrapperProps {
  marginTop?: boolean
}

export const ListWrapper = styled.div<ListWrapperProps>`
${({ theme, marginTop }) =>
  marginTop &&
  css`
    margin-top: ${theme.spacing(13)}px;
  `}
  
  padding: 0 ${props => props.theme.spacing(1)}px;

  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props => props.theme.spacing(19)}px;
    `}
`

interface ILoadingContent {
  errorType?: boolean
  hasFilterInfo?: boolean
}

export const WrapperContent = styled.div<ILoadingContent>`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray3};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.hasFilterInfo
      ? css`
          height: calc(100vh - 142px);
        `
      : css`
          height: calc(100vh - 100px);
        `}

  margin: ${props => props.theme.spacing(2)}px 0;
  padding: 0 ${props => props.theme.spacing(7)}px;
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
