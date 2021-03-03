import React, { ReactNode } from 'react'
import { Container } from 'styled-bootstrap-grid'

import { JustifyContent } from './BottomNavigationBar/types'
import BottomNavigationBar from './BottomNavigationBar'
import * as S from './styles'

/**
 * Option to implement the body of a Layer component
 *
 * @export
 * @param {Object} props
 * @param {ReactNode} props.children - React children
 * @param {ReactNode} props.bottomNavigationContent - Bottom navigation children
 * @param {Boolean} [props.wrapWithContainer = false] - Whether there should be a container wrapped around the content
 * @param {number} [props.headerHeight = 128] - Default height of the layer header
 * @param {JustifyContent} [props.bottomNavigationJustifyContent = JustifyContent.END] - Align content of bottom navigation
 *
 * @example Sample
 * <FlexibleLayerContent wrapWithContainer={true}>
 *    I'm a children!
 * </FlexibleLayerContent>
 *
 * @example Sample with bottom navigation
 * <FlexibleLayerContent
 *    wrapWithContainer={true}
 *    bottomNavigationJustifyContent={JustifyContent.CENTER}
 *    bottomNavigationContent={<>I'm a bottom navigation content</>}
 * >
 *    I'm a children!
 * </FlexibleLayerContent>
 *
 * @example Complex styling inner components
 * @file pages/CreditCard/PRO/ProposalResolution/Fail
 */

export default function FlexibleLayerContent({
  children,
  bottomNavigationContent,
  wrapWithContainer = false,
  headerHeight = 128,
  bottomNavigationJustifyContent = JustifyContent.END,
  ...rest
}: {
  children: ReactNode
  bottomNavigationContent?: ReactNode
  wrapWithContainer?: boolean
  headerHeight?: number
  bottomNavigationJustifyContent?: JustifyContent
}) {
  return (
    <S.Flexible
      headerHeight={headerHeight}
      data-testid="flexibleLayerContent"
      {...rest}
    >
      <S.Content>
        {wrapWithContainer ? <Container>{children}</Container> : children}
      </S.Content>

      {bottomNavigationContent && (
        <BottomNavigationBar
          justifyContent={bottomNavigationJustifyContent}
          data-testid="flexibleLayerContentBottomNavigationBar"
        >
          {bottomNavigationContent}
        </BottomNavigationBar>
      )}
    </S.Flexible>
  )
}
