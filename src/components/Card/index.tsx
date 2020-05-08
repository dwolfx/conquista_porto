import React, { FunctionComponent } from 'react'
import 'styled-components/macro'

import Text from 'components/Text'
import Popover from 'components/Popover/index'
import HorizontalList from 'components/HorizontalList'
import Icon, { dict } from 'components/IconExporter'

import {
  CardWrapper,
  CardHeader,
  CardBody,
  CardFooter,
  CardIcon,
  CardIconInfo,
  CardTitle,
} from './styles'

const Card: FunctionComponent<IProps> = ({
  children,
  headerIcon,
  headerIconInfo = false,
  headerIconInfoMsg = '',
  headerIconInfoClick = () => {},
  headerTitle,
  headerEndItem: HeaderEndItem,
  footer,
  ...rest
}) => {
  const CardHeaderContent = () => (
    <HorizontalList
      size="small"
      startItems={[<CardTitle>{headerTitle}</CardTitle>]}
      endItems={HeaderEndItem ? [HeaderEndItem] : []}
      css={`
        width: 100%;
        padding: 0;
      `}
    />
  )

  return (
    <CardWrapper hasFooter={!!footer} {...rest}>
      {headerTitle && (
        <CardHeader>
          {headerIcon && (
            <CardIcon>
              <Icon name={headerIcon} color="white" width={21} />
            </CardIcon>
          )}
          <CardHeaderContent />
          {headerIconInfo && (
            <CardIconInfo>
              <Popover
                tooltip
                content={() => (
                  <Text type="body" color="white">
                    {headerIconInfoMsg}
                  </Text>
                )}
              >
                <Icon
                  name="information"
                  color="blue4"
                  onClick={() => headerIconInfoClick()}
                />
              </Popover>
            </CardIconInfo>
          )}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardWrapper>
  )
}

interface IProps {
  headerIcon?: keyof typeof dict
  headerIconInfo?: boolean
  headerIconInfoMsg?: string
  headerIconInfoClick?: () => void
  headerTitle?: string
  footer?: React.ReactNode
  headerEndItem?: React.ReactNode
}

export default Card
