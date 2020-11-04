import styled from 'styled-components'
import IconExporter from 'components/IconExporter'
import Text from 'components/Text'

import { IStOptionsContainer, ISelectedListContainer } from './types'

export const StSelectContainer = styled.div`
  width: 100%;
`

export const StSelectWrapper = styled.div`
  position: relative;
`

export const StInput = styled.input`
  width: 100%;
`

export const StOptionsContainer = styled.div<IStOptionsContainer>`
  position: absolute;
  display: ${props => (props.$hasOptions ? 'block' : 'none')};
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  z-index: 99;
`

export const StOptionsUl = styled.ul`
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

export const StOptionLi = styled.li`
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

export const StOptionIcon = styled(IconExporter)`
  cursor: pointer;
`

export const StSelectedListContainer = styled.div<ISelectedListContainer>`
  display: ${props => (props.$selectedOptionsLength ? 'block' : 'none')};
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const StSelectedListUl = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`

export const StSelectedListLi = styled.li`
  &:last-of-type {
    margin-right: 0;
  }
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const StSelectedListButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border:${({theme}) => `1px solid ${theme.colors.blue4}`};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${props => props.theme.colors.blue4};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${({theme}) => `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  font-size: 11px;
`

export const StText = styled(Text)`
  white-space: nowrap;
`

export const StSelectedListIcon = styled(IconExporter)`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`
