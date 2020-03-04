import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import IconExporter from '../../IconExporter'

export const Container = styled.section`
  display: flex;
  background-color: ${props =>
    props.backgroundColor || props.theme.colors.gray1};
  justify-content: center;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const ColItem = styled(Col)`
  padding: 28px;
  border-right: 1px solid ${props => props.theme.colors.gray3};

  :last-child {
    border-right: none;
  }

  @media ${props => props.theme.mediaQueries.md} {
    border-right: none;
  }
`

export const IconStyled = styled(IconExporter)`
  padding-right: 20px;
`

export const Title = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 19px;
  font-weight: 300;
  text-align: left;
  color: ${props => props.theme.colors.gray6};
  margin-top: 12px;
`

export const DownloadLink = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.blue4};
  margin-top: 12px;
  font-weight: 600;

  :hover {
    color: ${props => props.theme.colors.blue5};
  }
`
