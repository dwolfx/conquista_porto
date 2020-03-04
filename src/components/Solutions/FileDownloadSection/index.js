import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { Container, Row } from 'styled-bootstrap-grid'

import { ColItem, IconStyled, Title, Description, DownloadLink } from './styles'

export default function FileDownloadSection({ data, ...rest }) {
  const themeContext = useContext(ThemeContext)
  return (
    <Container {...rest}>
      <Row>
        {data.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ColItem key={`${index}+${item.title}`} lg={12 / data.length} md="6">
            <div>
              <IconStyled
                name={item.icon || 'pdf'}
                fill={themeContext.colors.gray6}
                height="24px"
              />
            </div>
            <div>
              <Title>{item.title}</Title>
              <Description align="left">{item.description}</Description>
              <Link
                to={{
                  pathname: '/redirect',
                  state: { url: item.url },
                }}
                data-gtm-type="click"
                data-gtm-clicktype="link"
                data-gtm-subname={item.title}
                data-gtm-name={item.buttonText}
              >
                <DownloadLink>{item.buttonText} &gt; </DownloadLink>
              </Link>
            </div>
          </ColItem>
        ))}
      </Row>
    </Container>
  )
}

FileDownloadSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      iconName: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      buttonText: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
}
