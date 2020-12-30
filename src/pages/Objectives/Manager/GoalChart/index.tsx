import React from 'react'

import useMedia from 'hooks/useMedia'
import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

import HorizontalChart from './HorizontalChart'
import VerticalChart from './VerticalChart'

interface IProps {
  data: IObjectManagement
  isLoading: boolean
}

export default function GoalChart({ data, isLoading }: IProps) {
  const isMobile = useMedia('sm')

  return isMobile ? (
    <VerticalChart data={data} isLoading={isLoading} isMobile={isMobile} />
  ) : (
    <HorizontalChart data={data} isLoading={isLoading} />
  )
}
