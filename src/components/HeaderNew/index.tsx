import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import BreadCrumb from 'components/Breadcrumb'
import Divisor from 'components/Divisor'
import Button from 'components/Button/IconText'
import DropDown, { IItemsProps } from 'components/DropdownNew'

import { handleGiwRedirect } from 'helpers'
import { AuthRequestLogout } from 'store/modules/Auth/action'

import useFetchPointsBalance from 'hooks/Points/useFetchPointsBalance'
import { useCustomerProfile } from 'hooks/CustomerProfile/useCustomerProfile'

import MobileHeader from './Mobile'
import { NotificationsContent } from './DropdownContents'

import {
  BgWrapper,
  GridContainer,
  LeftBlock,
  RightBlock,
  Icon,
  ConquistaBeta,
  Profile,
  Name,
  Points,
  ResponsiveMenu,
  MenuTag,
  NotificationBell,
  Avatar,
} from './styles'

interface IProps {
  crumbs: string[]
}

export default function HeaderNew({ crumbs }: IProps) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isTabletOrLower = useMedia('md')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [pointsAmountBalance, setPointsAmountBalance] = useState(0)
  const { customerProfile, balanceData, points, userData } = useSelector(
    (state: any) => ({
      customerProfile: state.customerProfile,
      balanceData: state.points.balanceData,
      points:
        state.points.data && state.points.data.detalheExtratoOptemaisTypes,
      userData: state.auth,
    })
  )

  function checkScroll() {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  useEffect(() => {
    setPointsAmountBalance(
      balanceData.consultaPontosResponseType
        ? balanceData.consultaPontosResponseType.saldoAtual
        : 0
    )
  }, [balanceData])

  useCustomerProfile()
  useFetchPointsBalance()

  const dropdownGtmItemsTitle = 'dropdown menu header'
  const items: IItemsProps[] = [
    {
      icon: 'home',
      text: 'Início',
      path: '/',
    },
    {
      icon: 'apps',
      text: 'Produtos',
      children: [
        {
          icon: 'creditcard',
          text: 'Cartão de Crédito',
          path: '/cartao-credito',
        },
        {
          icon: 'homewithwindow',
          text: 'Consórcio de Imóvel',
          path: '/consorcio-imovel',
        },
        {
          icon: 'car2',
          text: 'Consórcio de Veículo',
          path: '/consorcio-veiculo',
        },
        {
          icon: 'money',
          text: 'Financiamento de Veículo',
          path: '/financiamento-veiculo',
        },
        {
          icon: 'barchart',
          text: 'Investimentos',
          path: '/investimentos',
        },
        {
          icon: 'time',
          text: 'Previdência Privada',
          path: '/previdencia-privada',
        },
        {
          icon: 'persongroup',
          text: 'Seguro de Vida',
          path: '/seguro-vida',
        },
        {
          icon: 'plane',
          text: 'Seguro Viagem',
          path: '/seguro-viagem',
        },
      ],
    },
  ]

  const dropdownNodesTitle = 'Dropdown notificações header'
  const nodes = [NotificationsContent]

  const renderResponsideHeader = () => (
    <div data-testid="header-hamburguer">
      {isMobileOpen && (
        <MobileHeader
          items={items}
          customerName={
            customerProfile.data ? customerProfile.data.customerName : ''
          }
          setIsOpen={setIsMobileOpen}
          totalPoints={
            !!points &&
            !!pointsAmountBalance &&
            Intl.NumberFormat().format(pointsAmountBalance)
          }
          exitFunc={() => dispatch(AuthRequestLogout(userData.accessToken))}
        />
      )}
      <BgWrapper>
        <GridContainer>
          <LeftBlock>
            <ConquistaBeta
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-subname="header"
              data-gtm-name="conquista logo"
              onClick={() => history.push('/')}
            />
          </LeftBlock>
          <RightBlock>
            <ResponsiveMenu
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="responsive header"
              data-gtm-name="abrir menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <Icon name="menu" color="white" />
            </ResponsiveMenu>
          </RightBlock>
        </GridContainer>
      </BgWrapper>
    </div>
  )

  const renderFullHeader = () => (
    <BgWrapper isScrolled={isScrolled} data-testid="header-desktop">
      <GridContainer>
        <LeftBlock>
          <ConquistaBeta
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="header"
            data-gtm-name="conquista logo"
            onClick={() => history.push('/')}
          />
          <DropDown
            items={items}
            title={dropdownGtmItemsTitle}
            containerPadding="14px 0"
          >
            <MenuTag
              color="blue"
              text="MENU"
              data-gtm-type="click"
              data-gtm-clicktype="menu"
              data-gtm-subname="header"
              data-gtm-name="menu"
            />
          </DropDown>
          {crumbs.length > 0 && crumbs[0] && <Icon name="arrowright" />}
          <BreadCrumb crumbs={[...crumbs]} version="new" />
        </LeftBlock>
        <RightBlock>
          <div
            css={`
              display: none;
            `}
          >
            <DropDown
              nodes={nodes}
              title={dropdownNodesTitle}
              containerPadding="14px 14px 0 14px"
              redirectPath="/notificacoes"
            >
              <NotificationBell
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname="header"
                data-gtm-name="icone notificacoes"
              />
            </DropDown>
          </div>
          <Avatar
            onClick={() =>
              handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
            }
          />
          <Profile>
            <div>
              <Name
                onClick={() =>
                  handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
                }
                data-gtm-type="click"
                data-gtm-clicktype="link"
                data-gtm-subname="header"
                data-gtm-name="nome do usuario"
              >
                {customerProfile.data && customerProfile.data.customerName}
              </Name>
              {!!balanceData.consultaPontosResponseType &&
                !!pointsAmountBalance && (
                  <Points>
                    {Intl.NumberFormat().format(pointsAmountBalance)} pontos
                  </Points>
                )}
            </div>
          </Profile>
          <Divisor vertical customSize="35px" />
          <Button
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="header"
            data-gtm-name="sair"
            iconName="leave"
            onClick={() => {
              dispatch(AuthRequestLogout(userData.accessToken))
            }}
          >
            SAIR
          </Button>
        </RightBlock>
      </GridContainer>
    </BgWrapper>
  )
  return isTabletOrLower ? renderResponsideHeader() : renderFullHeader()
}
