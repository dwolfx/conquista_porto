import styled from 'styled-components'

import IconExporter from '../../IconExporter'

export const Container = styled.section`
  display: flex;
  background-color: ${props => props.backgroundColor || '#f1f1f1'};
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const Item = styled.div`
  display: flex;
  padding: 20px 20px;
  border-right: 1px solid #ccc;

  :last-child {
    border-right: none;
  }

  @media (min-width: 1000px) {
    max-width: 500px;
  }

  @media (max-width: 800px) {
    border-right: none;
  }
`

export const IconStyled = styled(IconExporter)`
  padding-right: 20px;
`

export const Title = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #1c1c1c;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 19px;
  font-weight: 300;
  text-align: left;
  color: #1c1c1c;
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
  color: #30c5ff;
  margin-top: 12px;
  font-weight: 600;

  :hover {
    color: #2591bb;
  }
`
