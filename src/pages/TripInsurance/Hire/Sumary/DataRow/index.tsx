import React from 'react'
import 'styled-components/macro'

import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import * as S from '../styles'

interface IProps {
  label: string
  value: string
}
const DataRow = ({ label, value }: IProps) => {
  const isMobile = useMedia('xs')

  return (
    <>
      {isMobile ? (
        <S.VerticalList
          noSpacing      
          elements={[
            <Text type="captionUppercase" bold color="gray5">
              {label}
            </Text>,
            <Text type="headline" bold color="gray6">
              {value}
            </Text>,
          ]}
        />
      ) : (
        <div>
          <S.HorizontalList
            startItems={[
              <Text type="caption" bold color="gray5">
                {label}
              </Text>,
            ]}
            endItems={[
              <Text type="title" bold color="gray6">
                {value}
              </Text>,
            ]}
          />
        </div>
      )}
    </>
  )
}

export default DataRow
