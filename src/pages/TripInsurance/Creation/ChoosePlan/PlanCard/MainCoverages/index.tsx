import React from 'react'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import * as s from './styles'

interface IMainCoveragesProps {
  isMobile: boolean
  isMdUp: boolean
  isLg: boolean
  firstCoverageAmount?: string
  secondCoverageAmount?: string
  thridCoverageAmount?: string
}

export default function MainCoverages({
  isMobile,
  isMdUp,
  isLg,
  firstCoverageAmount,
  secondCoverageAmount,
  thridCoverageAmount,
}: IMainCoveragesProps) {
  if (isMobile || (isMdUp && isLg)) {
    return (
      <s.CoverageWrapper>
        <s.CoverageVerticalList
          elements={[
            <s.CoverageText type="captionUppercase" bold color="gray5">
              Despesas médicas, hospitalares e/ou odontológicas - dmho
            </s.CoverageText>,
            <Text bold truncate>
              {firstCoverageAmount}
            </Text>,
          ]}
        />
        <s.Divider />
        <s.CoverageVerticalList
          elements={[
            <s.CoverageText type="captionUppercase" bold color="gray5">
              Morte acidental
            </s.CoverageText>,
            <Text bold truncate>
              {secondCoverageAmount}
            </Text>,
          ]}
        />
        <s.Divider />
        <s.CoverageVerticalList
          elements={[
            <s.CoverageText type="captionUppercase" bold color="gray5">
              Extravio de bagagem
            </s.CoverageText>,
            <Text bold truncate>
              {thridCoverageAmount}
            </Text>,
          ]}
        />
      </s.CoverageWrapper>
    )
  }
  return (
    <s.CoverageWrapper>
      <HorizontalList
        noPadding
        size="medium-large"
        startItems={[
          <s.CoverageText type="captionUppercase" bold color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </s.CoverageText>,
        ]}
        endItems={[
          <Text bold truncate>
            {firstCoverageAmount}
          </Text>,
        ]}
      />
      <HorizontalList
        noPadding
        size="medium"
        startItems={[
          <s.CoverageText type="captionUppercase" bold color="gray5">
            Morte acidental
          </s.CoverageText>,
        ]}
        endItems={[
          <Text bold truncate>
            {secondCoverageAmount}
          </Text>,
        ]}
      />
      <HorizontalList
        noPadding
        size="medium"
        startItems={[
          <s.CoverageText type="captionUppercase" bold color="gray5">
            extravio de bagagem
          </s.CoverageText>,
        ]}
        endItems={[
          <Text bold truncate>
            {thridCoverageAmount}
          </Text>,
        ]}
      />
    </s.CoverageWrapper>
  )
}
