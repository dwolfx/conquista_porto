import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import {
  Container,
  Item,
  IconStyled,
  Title,
  Description,
  DownloadLink,
} from './styles'

export default function FileDownloadSection({ data, ...rest }) {
  const themeContext = useContext(ThemeContext)
  return (
    <Container {...rest}>
      {data.map((item, index) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={`${index}+${item.title}`}
          data-gtm-type="container"
          data-gtm-name={item.title}
        >
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
              data-gtm-name={`${item.title} - ${item.buttonText}`}
            >
              <DownloadLink>{item.buttonText} &gt; </DownloadLink>
            </Link>
          </div>
        </Item>
      ))}
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
