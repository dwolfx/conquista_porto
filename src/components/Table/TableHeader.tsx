import React from 'react'

import Icon from 'components/IconExporter'

import * as s from './styles'

export const SimpleHeader = ({ header }: any) => {
  const headerContent = header.render('Header')
  const styles = header.styles ? header.styles.header || header.styles : header

  const renderHeaderContent = (content: any) => {
    if (typeof content === 'string') {
      return (
        <>
          <s.TheadText type="subheading" color="gray6" bold>
            {content}
          </s.TheadText>
          {header.canSort ? (
            <s.IconContainer
              isSorted={header.isSorted}
              isSortedDesc={header.isSortedDesc}
            >
              <Icon name="arrowsortable" color="gray4" />
            </s.IconContainer>
          ) : null}
        </>
      )
    }

    return content
  }

  return (
    <s.TheadTh
      width={styles.width}
      minWidth={styles.minWidth}
      canSort={header.canSort}
      isSticky={!!header.sticky}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <s.TheadContent
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
      >
        {headerContent ? renderHeaderContent(headerContent) : null}
      </s.TheadContent>
    </s.TheadTh>
  )
}

export const HeaderWithColumns = ({ header }: any) => (
  <s.TheadThWithColumns width={header.width}>
    {header.Header}
    <s.TheadContent>
      {header.columns.map((headerColumn: any) => (
        <s.TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <s.TheadText>{headerColumn.render('Header')}</s.TheadText>
        </s.TheadColumn>
      ))}
    </s.TheadContent>
  </s.TheadThWithColumns>
)

const TheadWrapper = ({ header }: any) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

export default TheadWrapper
