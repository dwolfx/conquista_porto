import React, { FunctionComponent } from 'react'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import Icon, { dict } from 'components/IconExporter'

import {
  CardWrapper,
  CardHeader,
  CardBody,
  CardFooter,
  CardIcon,
  CardTitle,
} from './styles'

const Card:FunctionComponent<IProps> = ({
  children,
  headerIcon,
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
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardWrapper>
  )
}


interface IProps {
  headerIcon?: keyof typeof dict
  headerTitle?: string
  footer?: React.ReactNode
  headerEndItem?: React.ReactNode
}

export default Card;
