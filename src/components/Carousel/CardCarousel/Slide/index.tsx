import React from 'react'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import * as S from './styles'

export default function Slide({
  id,
  title,
  describe,
  value,
  selected,
  onClickHandler,
}: {
  id: number
  title: string
  describe: string
  value: string
  selected: boolean
  onClickHandler: (id: number) => void
}) {
  return (
    <S.Slide onClick={() => onClickHandler(id)} selected={selected}>
      <VerticalList
        elements={[
          <Text type="captionUppercase" bold color="gray6">
            {title}
          </Text>,
          <Text type="caption" bold color={selected ? 'blue4' : 'gray5'}>
            {describe}
          </Text>,
        ]}
        css={`
          padding: 0;
        `}
      />
      <Text type="body" bold color={selected ? 'gray6' : 'gray5'}>
        {value}
      </Text>
    </S.Slide>
  )
}
