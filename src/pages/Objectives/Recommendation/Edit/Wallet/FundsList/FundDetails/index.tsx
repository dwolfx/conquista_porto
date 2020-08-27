import React from 'react'

import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import { IFundDetails } from './types'

export default function FundDetails({
  isOpen,
  setIsOpen,
  title,
  category,
}: IFundDetails) {
  const isMobile = useMedia('sm')

  return isMobile ? (
    <FundDetailModal
      title={title}
      category={category}
      isOpenForInvestments
      isOpen={isOpen}
      isLayerOpen
      handleLayerOpen={() => null}
      handleClose={() => setIsOpen(false)}
    />
  ) : (
    <FundDetailDrawer
      isOpen={isOpen}
      isLayerOpen
      handleLayerOpen={() => null}
      isOpenForInvestments
      handleClose={() => setIsOpen(false)}
    />
  )
}
