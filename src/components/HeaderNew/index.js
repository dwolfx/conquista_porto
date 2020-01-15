import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BreadCrumb from 'components/Breadcrumb'
import Tag from 'components/Tag'
import NotificationBell from 'components/NotificationBell'
import Avatar from 'components/Avatar'
// import DropDown from 'components/Dropdown'
import {
  Container,
  LeftBlock,
  RightBlock,
  Icon,
  ConquistaBeta,
  Profile,
  Name,
  Points,
} from './styles'

export default function HeaderNew() {
  const history = useHistory()
  const [crumbs, setCrumbs] = useState([])
  const bankData = useSelector(
    state =>
      state.bankData.data.length > 0 &&
      state.bankData.data[0].dadosContaPortoSeguro
  )

  useEffect(() => {
    if (history && !crumbs) {
      setCrumbs(history.location.pathname.split('/').filter(el => el !== ''))
    }
  }, [history, crumbs])

  useEffect(() => {
    setCrumbs(history.location.pathname.split('/').filter(el => el !== ''))
  }, [history.location.pathname])

  return (
    <Container>
      <LeftBlock>
        <ConquistaBeta />
        <Tag color="blue" text="MENU" />
        {crumbs.length > 0 && <Icon />}
        <BreadCrumb crumbs={[...crumbs]} version="new" />
      </LeftBlock>
      <RightBlock>
        <NotificationBell />
        <Avatar />
        <Profile>
          <Name>{bankData && bankData.titular}</Name>
          <Points>4.200 pontos</Points>
        </Profile>
      </RightBlock>
    </Container>
  )
}
