import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import Table from 'components/Table'
import { TheadTr, TbodyTr } from 'components/Table/styles'

import logoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Icon from 'components/IconExporter'
import { TextStyle } from 'components/Text/styles'
import { LayerCard } from 'components/FundDetail/Card/styles'

export const LogoConquistaBeta = styled.img.attrs(() => ({
  src: logoConquistaBeta,
  alt: 'Logo Conquista Beta',
}))``

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const SubHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayblue1};
  padding: ${({ theme }) => `0 ${theme.spacing(6)}px`};
`

export const TitleWrapper = styled.div`
  display: flex;
  > ${TextStyle}:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const RowFilter = styled(Row)`
  margin: 0;
  justify-content: space-between;
`

export const RowTable = styled(Row)`
  margin: ${({ theme }) => theme.spacing(3)}px 0 0 0;
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

export const FundDetailContainer = styled.div`
  ${LayerCard} {
    height: 460px;
  }
`

export const WrapperSelectRange = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: ${({ theme }) => theme.spacing(3)}px;
`

export const WrapperFilters = styled.div`
  display: flex;
`

export const StyledTable = styled(Table)`
  height: 292px;
  ${TheadTr} {
    justify-content: space-between;
  }
  ${TbodyTr} {
    justify-content: space-between;
    height: 56px;
  }
`
