import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as add } from 'assets/icons/add.svg'
import { ReactComponent as alertrounded } from 'assets/icons/alert-rounded.svg'
import { ReactComponent as apps } from 'assets/icons/apps.svg'
import { ReactComponent as arrowdown } from 'assets/icons/arrow-down2.svg'
import { ReactComponent as arrowleft } from 'assets/icons/arrow-left.svg'
import { ReactComponent as arrowright } from 'assets/icons/arrow-right-new.svg'
import { ReactComponent as arrowup } from 'assets/icons/arrow-up.svg'
import { ReactComponent as arrowsortable } from 'assets/icons/arrow-sortable.svg'
import { ReactComponent as awesome } from 'assets/icons/awesome.svg'
import { ReactComponent as backward } from 'assets/icons/backward.svg'
import { ReactComponent as barchart } from 'assets/icons/bar-chart.svg'
import { ReactComponent as barcode } from 'assets/icons/bar-code.svg'
import { ReactComponent as bell } from 'assets/icons/bell.svg'
import { ReactComponent as billing } from 'assets/icons/billing.svg'
import { ReactComponent as boy } from 'assets/icons/boy.svg'
import { ReactComponent as businesswoman } from 'assets/icons/business-woman.svg'
import { ReactComponent as building } from 'assets/icons/building.svg'
import { ReactComponent as fingerprint } from 'assets/icons/finger-print.svg'
import { ReactComponent as car } from 'assets/icons/car.svg'
import { ReactComponent as car2 } from 'assets/icons/car2.svg'
import { ReactComponent as carnew } from 'assets/icons/car-new.svg'
import { ReactComponent as callcenter } from 'assets/icons/call-center.svg'
import { ReactComponent as calendar } from 'assets/icons/calendar.svg'
import { ReactComponent as close } from 'assets/icons/close.svg'
import { ReactComponent as coin } from 'assets/icons/coin.svg'
import { ReactComponent as computersecure } from 'assets/icons/computer-secure.svg'
import { ReactComponent as creditcard } from 'assets/icons/credit-card.svg'
import { ReactComponent as creditcard2 } from 'assets/icons/credit-card2.svg'
import { ReactComponent as diamond } from 'assets/icons/diamond.svg'
import { ReactComponent as drink } from 'assets/icons/drink.svg'
import { ReactComponent as financial } from 'assets/icons/financial.svg'
import { ReactComponent as forward } from 'assets/icons/forward.svg'
import { ReactComponent as gear } from 'assets/icons/gear.svg'
import { ReactComponent as home } from 'assets/icons/home.svg'
import { ReactComponent as hospital } from 'assets/icons/hospital.svg'
import { ReactComponent as homewithwindow } from 'assets/icons/home-with-window.svg'
import { ReactComponent as idea } from 'assets/icons/idea.svg'
import { ReactComponent as information } from 'assets/icons/information.svg'
import { ReactComponent as leave } from 'assets/icons/leave.svg'
import { ReactComponent as linechart } from 'assets/icons/line-chart.svg'
import { ReactComponent as link } from 'assets/icons/link.svg'
import { ReactComponent as lock } from 'assets/icons/lock.svg'
import { ReactComponent as malefemale } from 'assets/icons/male-female.svg'
import { ReactComponent as menu } from 'assets/icons/menu.svg'
import { ReactComponent as money } from 'assets/icons/money.svg'
import { ReactComponent as monitoranalytics } from 'assets/icons/monitor-analytics.svg'
import { ReactComponent as pdf } from 'assets/icons/pdf.svg'
import { ReactComponent as personaccident } from 'assets/icons/person-accident.svg'
import { ReactComponent as persongroup } from 'assets/icons/person-group.svg'
import { ReactComponent as persongroup2 } from 'assets/icons/person-group2.svg'
import { ReactComponent as plane } from 'assets/icons/plane.svg'
import { ReactComponent as piechart } from 'assets/icons/pie-chart.svg'
import { ReactComponent as remove } from 'assets/icons/remove.svg'
import { ReactComponent as refresh } from 'assets/icons/refresh.svg'
import { ReactComponent as safebox } from 'assets/icons/safe-box.svg'
import { ReactComponent as student } from 'assets/icons/student-male.svg'
import { ReactComponent as talkman } from 'assets/icons/talk-man.svg'
import { ReactComponent as tag } from 'assets/icons/tag.svg'
import { ReactComponent as target } from 'assets/icons/target.svg'
import { ReactComponent as targetmarket } from 'assets/icons/target-market.svg'
import { ReactComponent as thumbsup } from 'assets/icons/thumbs-up.svg'
import { ReactComponent as time } from 'assets/icons/time.svg'
import { ReactComponent as trash } from 'assets/icons/trashcan.svg'
import { ReactComponent as user } from 'assets/icons/user.svg'
import { ReactComponent as wallet } from 'assets/icons/wallet.svg'

import { ReactComponent as visa } from 'assets/images/visa.svg'
import { ReactComponent as master } from 'assets/images/mastercard.svg'

const dict = {
  add,
  alertrounded,
  apps,
  arrowdown,
  arrowleft,
  arrowright,
  arrowsortable,
  arrowup,
  awesome,
  backward,
  barchart,
  barcode,
  bell,
  billing,
  boy,
  building,
  businesswoman,
  calendar,
  callcenter,
  car,
  car2,
  carnew,
  close,
  coin,
  computersecure,
  creditcard,
  creditcard2,
  diamond,
  drink,
  financial,
  fingerprint,
  forward,
  gear,
  home,
  homewithwindow,
  hospital,
  idea,
  information,
  leave,
  linechart,
  link,
  lock,
  malefemale,
  menu,
  money,
  monitoranalytics,
  pdf,
  personaccident,
  persongroup,
  persongroup2,
  piechart,
  plane,
  refresh,
  remove,
  safebox,
  student,
  tag,
  talkman,
  target,
  targetmarket,
  thumbsup,
  time,
  trash,
  user,
  wallet,
  visa,
  master,
}

const IconComponent = ({ name, ...props }) => {
  const Icon = dict[name.toLowerCase()]
  return <Icon {...props} />
}

IconComponent.propTypes = {
  name: PropTypes.oneOf(Object.keys(dict)).isRequired,
}

export default IconComponent
