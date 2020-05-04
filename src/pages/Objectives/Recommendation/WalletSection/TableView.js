import React from 'react'
import PropTypes from 'prop-types'

// import IconButton from 'components/Button/Icon'
// import Text from 'components/Text'
// import { formatMoney } from 'helpers'

import { columns, fundsType } from './tableData'
import * as s from './styles'

const DesktopView = ({ funds, handleOpenDetails }) => (
  <s.ContainerFunds>
    <s.Table
      columns={columns}
      onShowDetails={rowDetails => handleOpenDetails(rowDetails)}
      data={funds}
      fundsType={fundsType}
    />
  </s.ContainerFunds>
)

DesktopView.propTypes = {
  funds: PropTypes.arrayOf(
    PropTypes.shape({
      fund_id: PropTypes.number,
    })
  ).isRequired,
  handleOpenDetails: PropTypes.func.isRequired,
}

export default DesktopView
