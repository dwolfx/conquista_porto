import React from 'react'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Popover from 'components/Popover'

import * as s from './styles'

interface IProps {
  headerTitle: string
  onHandleClick?: () => void
}

const CardHeaderTitle = ({ headerTitle, onHandleClick }: IProps) => {
  return (
    <>
      {headerTitle ? (
        <s.CardHeaderTitleWrapper onClick={onHandleClick}>
          <Text type="headline" bold color="gray6">
            {headerTitle}
          </Text>
          <s.CardHeaderIcon>
            <Popover
              tooltip
              content={() => (
                <Text type="body" color="white">
                  Mais informações
                </Text>
              )}
            >
              <Icon
                name="information"
                color="blue4"
                role="button"
                aria-label="header-icon"
              />
            </Popover>
          </s.CardHeaderIcon>
        </s.CardHeaderTitleWrapper>
      ) : null}
    </>
  )
}

export default CardHeaderTitle
