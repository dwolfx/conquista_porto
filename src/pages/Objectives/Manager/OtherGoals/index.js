import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import ButtonLink from 'components/Button/Link'
import DropDown from 'components/DropdownNew'
import Loading from 'components/Loading'
import Text from 'components/Text'

import { categoryGoals } from 'pages/Objectives/GoalStreams/goalTypes'

import { MenuTag, Container, EmptyStateContainer } from './styles'

const LoadingState = () => (
  <Container>
    <Text
      type="headline"
      color="gray5"
      css={`
        margin-right: 21px;
      `}
    >
      Verificando outros objetivos...
    </Text>
    <Loading width={28} />
  </Container>
)

export default function OtherGoals({ otherGoals, isLoading }) {
  const history = useHistory()
  const [itensGoals, setItensGoals] = useState([])

  useEffect(() => {
    const listGoals = Object.entries(otherGoals).map(([key, value]) => {
      const subItem = value.map(item => ({
        text: item.nickname,
        path: `/objetivos/gerenciar/${item.id}`,
      }))
      const categoryItem = {
        icon: categoryGoals(key).icon,
        text: categoryGoals(key).text,
        children: subItem,
      }

      return categoryItem
    })

    setItensGoals(listGoals)
  }, [otherGoals])

  if (Object.entries(otherGoals).length === 0) {
    if (isLoading) {
      return <LoadingState />
    }

    return (
      <EmptyStateContainer>
        <Text color="gray5">
          Você não possui outros objetivos. Vamos criar um novo?
        </Text>
        <ButtonLink
          onClick={() => history.push('/objetivos')}
          noIcon
          css={`
            margin-top: 15px;
          `}
        >
          Criar novo objetivo
        </ButtonLink>
      </EmptyStateContainer>
    )
  }

  return (
    <DropDown
      items={itensGoals}
      title="Outros Objetivos"
      containerPadding="14px 0"
      openingSide="left"
      disabled={isLoading}
    >
      <Container>
        <MenuTag
          color="blue"
          text="OUTROS OBJETIVOS"
          data-gtm-type="click"
          data-gtm-clicktype="sub-menu"
          data-gtm-subname="header"
          data-gtm-name="outros-objetivos"
          disabled={isLoading}
          css={`
            padding-right: 0;
          `}
        />
        {isLoading && <Loading width={28} />}
      </Container>
    </DropDown>
  )
}

OtherGoals.propTypes = {
  otherGoals: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
