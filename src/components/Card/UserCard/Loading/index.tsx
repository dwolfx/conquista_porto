import React from 'react'

import Skeleton from 'react-loading-skeleton'

import * as S from '../styles'

export default function UserCardLoading() {

  return (
    <S.Card>
       <Skeleton circle={true} height={50} width={50} />
        <S.Info>
          <Skeleton width={200} />
          <Skeleton width={40} />
        </S.Info>
    </S.Card>
  )
}
