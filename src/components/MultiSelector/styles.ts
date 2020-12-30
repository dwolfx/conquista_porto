import styled from 'styled-components'
import IconExporter from 'components/IconExporter'
import TextComponent from 'components/Text'

import { IOptionsContainer, ISelectedListContainer } from './types'

export const SelectContainer = styled.div`
  width: 100%;
`

export const SelectWrapper = styled.div`
  position: relative;
`

export const Input = styled.input`
  width: 100%;
`

export const OptionsContainer = styled.div<IOptionsContainer>`
  box-shadow: ${props => props.theme.shadows.gray3};
  position: absolute;
  display: ${props => (props.$hasOptions ? 'block' : 'none')};
  width: 100%;
  max-height: 350px;
  ${({ optionsContainerHeight }) =>
    optionsContainerHeight && `max-height: ${optionsContainerHeight}px;`};
  overflow-y: auto;
  z-index: 99;
  ${({ optionBoxDirection, theme }) =>
    optionBoxDirection === 'top'
      ? `bottom: ${theme.spacing(10)}px`
      : `top: ${theme.spacing(10)}px`};
`

export const OptionsUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0;
  border-radius: 4px;
`

export const OptionLi = styled.li`
  width: 100%;
  font-size: 18px;
  &:first-of-type {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};
  cursor: pointer;
`

export const OptionIcon = styled(IconExporter)`
  cursor: pointer;
`

export const SelectedListContainer = styled.div<ISelectedListContainer>`
  display: ${props => (props.$selectedOptionsLength ? 'block' : 'none')};
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const SelectedListUl = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`

export const SelectedListLi = styled.li`
  &:last-of-type {
    margin-right: 0;
  }
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const SelectedListButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors.blue4}`};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${props => props.theme.colors.blue4};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  font-size: 11px;
`

export const Text = styled(TextComponent)`
  white-space: nowrap;
`

export const SelectedListIcon = styled(IconExporter)`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`
