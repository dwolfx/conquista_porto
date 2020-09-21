import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'

import {
  LifeInsuranceDataStateCard,
  TripInsuranceDataStateCard,
} from './InsuranceDataStateCard'

import {
  LifeInsuranceLoadingStateCard,
  TripInsuranceLoadingStateCard,
} from './InsuranceLoadingStateCard'

import {
  LifeInsuranceEmptyStateCard,
  TripInsuranceEmptyStateCard,
} from './InsuranceEmptyStateCard'

import {
  LifeInsuranceErrorStateCard,
  TripInsuranceErrorStateCard,
} from './InsuranceErrorStateCard'

import * as s from './styles'
import * as t from './types'

const InsuranceCard: React.FC<t.IInsuranceCard> = ({ headerEndItem }) => {
  const dispatch = useDispatch()
  const [arrayContent, setArrayContent] = useState<React.ReactNode[]>([])

  const { tripInsurance, lifeInsurance } = useSelector<any, any>(state => state)

  useEffect(() => {
    dispatch(GetTripInsuranceDataRequest())
    dispatch(GetLifeInsuranceDataRequest())
  }, [dispatch])

  useEffect(() => {
    const newArrayContent: React.ReactNode[] = []

    if (lifeInsurance && lifeInsurance.isLoading) {
      newArrayContent.push(<LifeInsuranceLoadingStateCard />)
    } else if (
      lifeInsurance &&
      lifeInsurance.data &&
      lifeInsurance.data.length > 0
    ) {
      lifeInsurance.data.forEach((lifeInsuranceData: any) => {
        newArrayContent.push(
          <LifeInsuranceDataStateCard data={lifeInsuranceData} />
        )
      })
    } else if (lifeInsurance && !lifeInsurance.data) {
      newArrayContent.push(<LifeInsuranceEmptyStateCard />)
    } else {
      newArrayContent.push(<LifeInsuranceErrorStateCard />)
    }

    if (tripInsurance && tripInsurance.isLoading) {
      newArrayContent.push(<TripInsuranceLoadingStateCard />)
    } else if (
      tripInsurance &&
      tripInsurance.data &&
      tripInsurance.data.length > 0
    ) {
      tripInsurance.data.forEach((tripInsuranceData: any) => {
        newArrayContent.push(
          <TripInsuranceDataStateCard data={tripInsuranceData} />
        )
      })
    } else if (tripInsurance && !tripInsurance.data) {
      newArrayContent.push(<TripInsuranceEmptyStateCard />)
    } else {
      newArrayContent.push(<TripInsuranceErrorStateCard />)
    }

    setArrayContent(newArrayContent)
  }, [lifeInsurance, tripInsurance])

  return (
    <s.CarouselCard
      headerIcon="targetmarket"
      headerTitle="Seguros"
      headerEndItem
      arrayContent={arrayContent}
    />
  )
}

export default memo(InsuranceCard)
