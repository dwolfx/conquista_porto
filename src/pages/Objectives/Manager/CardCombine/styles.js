import styled from 'styled-components'
import Banner from 'components/Banner'

export const ButtonContainer = styled.div`
  margin-top: 14px;
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => (props.notLastChild === 1 ? '28px' : '0px')};

  &:before {
    opacity: 0.65;
  }
`
