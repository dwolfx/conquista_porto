import styled from 'styled-components'
import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import IconList from 'assets/icons/list.svg'
import IconGrid from 'assets/icons/grid.svg'

export const RowContent = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`
export const RightContent = styled.div`
  display: flex;
  align-items: center;
`

export const ButtonTagStyled = styled(ButtonTag)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const ButtonClear = styled(ButtonLink)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
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

export const ButtonLayoutGrid = styled.div<IButtonLayoutProps>`
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

export const ButtonLayoutList = styled.div<IButtonLayoutProps>`
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
