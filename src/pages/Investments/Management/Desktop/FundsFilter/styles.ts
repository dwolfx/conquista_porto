import styled from 'styled-components'
import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import IconList from 'assets/icons/list.svg'
import IconGrid from 'assets/icons/grid.svg'
import { TFundsLayout } from 'pages/Investments/Management/types'

export const RowContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`
interface IRightContentProps {
  viewMode: TFundsLayout
}
export const RightContent = styled.div<IRightContentProps>`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing(16)}px;
  align-items: center;

  ${({ viewMode }) => {
    if (viewMode === 'LIST') {
      return `margin: 0;`
    }
  }}
`

export const ButtonTagStyled = styled(ButtonTag)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`
interface IButtonClearFilters {
  hasFilter: boolean
}

export const ButtonClearFilters = styled(ButtonLink)<IButtonClearFilters>`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  color: ${props =>
    props.hasFilter ? props.theme.colors.blue4 : props.theme.colors.gray4};
`
export const PriorNextFundsButtons = styled.div`
  padding: 0;
  width: ${({ theme }) => theme.spacing(10)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(7)}px;
`

interface IButtonLayoutProps {
  backgroundcolor: 'primary' | 'secondary'
}

export const ButtonViewModeGrid = styled.div<IButtonLayoutProps>`
  background-color: ${props =>
    props.backgroundcolor === 'primary'
      ? props.theme.colors.blue4
      : props.theme.colors.gray4};
  cursor: pointer;
  height: 21px;
  width: 21px;
  mask-image: url(${IconGrid});
  transition: all ease 0.3s;
  margin-left: ${({ theme }) => theme.spacing(4)}px;
`

export const ButtonViewModeList = styled.div<IButtonLayoutProps>`
  background-color: ${props =>
    props.backgroundcolor === 'primary'
      ? props.theme.colors.blue4
      : props.theme.colors.gray4};
  cursor: pointer;
  height: 21px;
  width: 21px;
  mask-image: url(${IconList});
  transition: all ease 0.3s;
  margin-left: ${({ theme }) => theme.spacing(4)}px;
`
