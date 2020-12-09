import React from 'react'
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

interface IProps {
  headerIcon?: keyof typeof dict
  headerIconInfo?: boolean
  headerIconInfoMsg?: string | React.ReactNode
  headerIconInfoClick?: () => void
  headerTitle?: string | React.ReactNode
  footer?: React.ReactNode
  headerEndItem?: React.ReactNode
  tooltip?: boolean
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
}

const Card: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  headerIcon,
  headerIconInfo = false,
  headerIconInfoMsg = '',
  headerIconInfoClick = () => {},
  headerTitle,
  headerEndItem: HeaderEndItem,
  footer,
  tooltip = true,
  overflow = 'hidden',
  ...rest
}) => {
  const CardHeaderContent = () => {
    let HeaderTitle: string | React.ReactNode = (
      <CardTitle type="headline" bold>
        {headerTitle}
      </CardTitle>
    )

    if (typeof headerTitle !== 'string') {
      HeaderTitle = headerTitle
    }

    return (
      <HorizontalList
        size="small"
        startItems={[HeaderTitle]}
        endItems={[HeaderEndItem]}
        css={`
          width: 100%;
          padding: 0;
          height: auto;
        `}
      />
    )
  }

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
            <CardIconInfo {...rest}>
              <Popover
                tooltip={tooltip}
                content={() => (
                  <Text type="body" color={tooltip ? 'white' : 'gray5'}>
                    {headerIconInfoMsg}
                  </Text>
                )}
              >
                <Icon
                  name="information"
                  color="blue4"
                  role="button"
                  aria-label="header-icon"
                  onClick={() => headerIconInfoClick()}
                />
              </Popover>
            </CardIconInfo>
          )}
        </CardHeader>
      )}
      <CardBody data-testid="card-body" overflow={overflow}>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardWrapper>
  )
}

export default Card
