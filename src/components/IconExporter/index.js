import React from 'react'

import { ReactComponent as add } from '../../assets/icons/add.svg'
import { ReactComponent as alertrounded } from '../../assets/icons/alert-rounded.svg'
import { ReactComponent as apps } from '../../assets/icons/apps.svg'
import { ReactComponent as arrowdown } from '../../assets/icons/arrow-down.svg'
import { ReactComponent as arrowright } from '../../assets/icons/arrow-right.svg'
import { ReactComponent as arrowup } from '../../assets/icons/arrow-up.svg'
import { ReactComponent as barchart } from '../../assets/icons/bar-chart.svg'
import { ReactComponent as bell } from '../../assets/icons/bell.svg'
import { ReactComponent as car } from '../../assets/icons/car.svg'
import { ReactComponent as close } from '../../assets/icons/close.svg'
import { ReactComponent as creditcard } from '../../assets/icons/credit-card.svg'
import { ReactComponent as diamond } from '../../assets/icons/diamond.svg'
import { ReactComponent as gear } from '../../assets/icons/gear.svg'
import { ReactComponent as homewithwindow } from '../../assets/icons/home-with-window.svg'
import { ReactComponent as home } from '../../assets/icons/home.svg'
import { ReactComponent as idea } from '../../assets/icons/idea.svg'
import { ReactComponent as menu } from '../../assets/icons/menu.svg'
import { ReactComponent as money } from '../../assets/icons/money.svg'
import { ReactComponent as persongroup } from '../../assets/icons/person-group.svg'
import { ReactComponent as plane } from '../../assets/icons/plane.svg'
import { ReactComponent as remove } from '../../assets/icons/remove.svg'
import { ReactComponent as target } from '../../assets/icons/target.svg'
import { ReactComponent as thumbsup } from '../../assets/icons/thumbs-up.svg'
import { ReactComponent as time } from '../../assets/icons/time.svg'

const IconComponent = ({ name, ...props }) => {
  const dict = {
    add,
    alertrounded,
    apps,
    arrowdown,
    arrowright,
    arrowup,
    barchart,
    bell,
    car,
    close,
    creditcard,
    diamond,
    gear,
    homewithwindow,
    home,
    idea,
    menu,
    money,
    persongroup,
    plane,
    remove,
    target,
    thumbsup,
    time
  }

  // if (name.toLowerCase() in dict) {
    const Icon = dict[name.toLowerCase()]
    return <Icon {...props} />
  // }

  // console.warn(`${name} not found`)
  // return false
}

export default IconComponent
