import React from 'react'
import PropTypes from 'prop-types'

import DropDown from 'components/DropdownNew'
import { categoryGoals } from 'pages/Objectives/GoalStreams/goalTypes'

import { MenuTag } from './styles'

export default function OtherGoals({ otherGoals }) {
  const itensGoals = []

  function listObjectives(element) {
    if (otherGoals[element]) {
      const subItem = otherGoals[element].map(item => ({
        text: item.nickname,
        path: `/objetivos/gerenciar/${item.id}`,
      }))
      const categoryItem = {
        icon: categoryGoals(element).icon,
        text: categoryGoals(element).text,
        children: subItem,
      }
      itensGoals.push(categoryItem)
    }
  }
  Object.entries(otherGoals).map(item => item.forEach(listObjectives))

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
        data-gtm-clicktype="outros-objetivos"
        data-gtm-subname="header"
        data-gtm-name="outros-objetivos"
      />
    </DropDown>
  )
}

OtherGoals.propTypes = {
  otherGoals: PropTypes.object.isRequired,
}
