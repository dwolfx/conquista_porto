import React, { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import { ProposalCard } from '../ProposalCard/styles'

import * as S from './styles'

const ProposalSkeleton = () => {
  const themeContext = useContext(ThemeContext)
  return (
    <ProposalCard>
      <SkeletonTheme
        color={themeContext.colors.gray1}
        highlightColor={themeContext.colors.gray3}
      >
        <S.BodyWrapper>
          <Skeleton
            width="60%"
            height={14}
            count={3}
            css={`
              margin-bottom: 7px;
            `}
          />
          <Skeleton
            width="100%"
            height={110}
            count={1}
            css={`
              margin: 21px 0;
            `}
          />
          <Skeleton
            width="100%"
            height={40}
            count={4}
            css={`
              margin: 7px 0;
            `}
          />
        </S.BodyWrapper>
      </SkeletonTheme>
    </ProposalCard>
  )
}

export default ProposalSkeleton
