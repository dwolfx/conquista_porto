import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ResponsiveLogoWrapper = styled(Link)`
  display: flex;
  width: auto;
  flex-direction: column;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 989px) {
    width: auto;
    align-self: center;
    margin-right: 0px;
  }
`
export const Img = styled.img`
  width: 150px;
  height: auto;
  @media (max-width: 989px) {
    margin-right: 0px;
  }
`
export const Text = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 19px;
  text-align: right;
`
