import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import { Manager, Reference, Popper } from 'react-popper'
import 'styled-components/macro'

import { handlePrivateWelfareRedirect } from 'helpers'

import { IItemsProps } from './interface'
import * as s from './styles'

interface IProps {
  items?: IItemsProps[]
  nodes?: React.ReactNode[]
  containerPadding?: string
  redirectPath?: string
  customWidth?: string
  openingSide?: 'start' | 'end'
  disabled?: boolean
  title?: string
  zIndex?: number
}

/**
 * ### HOW TO USE ###
 *
 * # Using the component #
 *  Wrap the element with the DropDown component.
 *  <DropdownNew>
 *    <div>MENU</div>
 *  </DropDownNew>
 *
 * # The props it requires #
 *  It's an array of objects which contains the following structure:
 *  items: IItemsProps[] = [
 *    {
 *      icon: 'arrowup', (valid icon name, check IconExporter component)
        text: 'test', (the text that will be displayed at the dropdown list)
        path: '/home', (the path to redirect)
        children: [ (it's not required, but if you use it must follow the same structure)
          {
            icon: 'arrowup',
            text: 'teste',
            path: '/home',
          },
          {
            icon: 'arrowdown',
            text: 'teste2',
            path: '/profile',
          },
        ],
 *    },
 *  ]
 *
 * OR
 *
 * node: React.ReactNode[] = [
      <div key="item1">ItemTest1</div>,
    <div key="item2">ItemTest2</div>,
  ]
 */

const Dropdown: React.FC<IProps> = ({
  items,
  children,
  nodes,
  customWidth = null,
  containerPadding = '14px',
  redirectPath = null,
  openingSide = 'start',
  disabled = false,
  title = '',
  zIndex = 7,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [childrenElements, setChildrenElements] = useState<Object[] | null>(
    null
  )
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const history = useHistory()

  function handleDropDown(value: boolean) {
    setIsOpen(value)
  }

  const handleMountChildren = (
    elements: Array<Object> | undefined = [],
    subMenuTitle: string | undefined = ''
  ) => {
    setSelectedItem(subMenuTitle)
    setIsHovering(true)

    if (!elements) {
      setIsHovering(false)
      return
    }

    setChildrenElements(
      elements.map((item: IItemsProps) => (
        <s.ItemWrapper
          data-gtm-type="click"
          data-gtm-clicktype="link"
          data-gtm-subname={subMenuTitle}
          data-gtm-name={item.text}
          key={item.text}
          onClick={() => item.path && handleClick(item.path)}
        >
          {item.icon && (
            <s.ItemIconContainer>
              <s.ItemIcon name={item.icon} />
            </s.ItemIconContainer>
          )}
          <s.ItemText type="headline" color="gray6" bold>
            {item.text}
          </s.ItemText>
        </s.ItemWrapper>
      ))
    )
  }

  function handleClick(path?: string | undefined) {
    if (path) {
      handleDropDown(false)
      path === '/previdencia-privada'
        ? handlePrivateWelfareRedirect()
        : history.push(path)
    }
    return handleDropDown(false)
  }

  const renderContent = () => {
    if (items) {
      return items.map(item => (
        <s.ItemWrapper
          data-gtm-type="click"
          data-gtm-clicktype={item.children ? 'sub-menu' : 'link'}
          data-gtm-subname={title}
          data-gtm-name={item.text}
          key={item.text}
          onMouseEnter={() => {
            if (item.children) {
              handleMountChildren(item.children, item.text)
            }
          }}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (item.path) {
              handleClick(item.path)
            }

            if (item.onClick) {
              item.onClick(event)

              handleDropDown(false)
            }
          }}
        >
          <s.ItemIconContainer>
            <s.ItemIcon name={item.icon} />
          </s.ItemIconContainer>
          <s.ItemText type="headline" color="gray6" bold>
            {item.text}
          </s.ItemText>
          {item.children && (
            <s.ItemIconContainer alignToEnd>
              <s.ItemIcon name="arrowright" />
            </s.ItemIconContainer>
          )}
          {isHovering && item.text === selectedItem && (
            <s.WrapperChildren openingSide={openingSide}>
              {childrenElements}
            </s.WrapperChildren>
          )}
        </s.ItemWrapper>
      ))
    }

    if (nodes) {
      return nodes.map(node => {
        if (typeof node === 'function')
          return node(() =>
            redirectPath ? handleClick(redirectPath) : handleClick()
          )
        return node
      })
    }

    return 'Skeleton needed'
  }

  return (
    <>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div
              ref={ref}
              onClick={() => setIsOpen(current => !current)}
              {...rest}
            >
              {children}
            </div>
          )}
        </Reference>
        {isOpen
          ? ReactDOM.createPortal(
              <>
                <Popper
                  placement={
                    `bottom-${openingSide}` as 'bottom-start' | 'bottom-end'
                  }
                  modifiers={{
                    keepTogether: {
                      enabled: true,
                    },
                    offset: {
                      offset: -1,
                    },
                    flip: {
                      enabled: true,
                    },
                    shift: {
                      enabled: true,
                    },
                  }}
                  css={`
                    #popper[data-popper-reference-hidden] {
                      visibility: hidden;
                      pointer-events: none;
                    }
                  `}
                >
                  {({ ref, ...other }: any) => (
                    <s.Container
                      ref={ref}
                      onMouseLeave={() => handleMountChildren()}
                      zIndex={zIndex}
                      {...other}
                    >
                      <s.Wrapper
                        containerPadding={containerPadding}
                        customWidth={customWidth}
                      >
                        {renderContent()}
                      </s.Wrapper>
                    </s.Container>
                  )}
                </Popper>
                <s.Backdrop
                  isOpen={isOpen}
                  id="backdrop"
                  onClick={() => handleDropDown(false)}
                  zIndex={zIndex}
                />
              </>,
              document.querySelector('#root') as HTMLDivElement
            )
          : null}
      </Manager>
    </>
  )
}

export default Dropdown
