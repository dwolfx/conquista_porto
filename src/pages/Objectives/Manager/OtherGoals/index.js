import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import 'styled-components/macro'

import DropDown from 'components/DropdownNew'
import { categoryGoals } from 'pages/Objectives/GoalStreams/goalTypes'

import { MenuTag } from './styles'

export default function OtherGoals({ otherGoals }) {
  const [itensGoals, setItensGoals] = useState([])

  useEffect(() => {
    const listObjectives = categoryNumber => {
      const subItem = otherGoals[categoryNumber].map(item => ({
        text: item.nickname,
        path: `/objetivos/gerenciar/${item.id}`,
      }))
      const categoryItem = {
        icon: categoryGoals(categoryNumber).icon,
        text: categoryGoals(categoryNumber).text,
        children: subItem,
      }
      return categoryItem
    }

    const listGoals = Object.keys(otherGoals).map(listObjectives)
    setItensGoals(listGoals)
  }, [otherGoals])

  return (
    <DropDown
      items={itensGoals}
      title="Outros Objetivos"
      containerPadding="14px 0"
      openingSide="left"
    >
      <MenuTag
        color="blue"
        text="OUTROS OBJETIVOS"
        data-gtm-type="click"
        data-gtm-clicktype="sub-menu"
        data-gtm-subname="header"
        data-gtm-name="outros-objetivos"
        css={`
          padding-right: 0;
        `}
      />
    </DropDown>
  )
}

OtherGoals.propTypes = {
  otherGoals: PropTypes.object.isRequired,
}
