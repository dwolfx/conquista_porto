import styled from 'styled-components'

import VerticalList from 'components/VerticalList'

export const InformationContainer = styled.div`
  margin-bottom: 7px;
`

export const VerticalListStyled = styled(VerticalList)`
  margin-bottom: 14px;
  width: ${props => props.width};
`

export const FileContainer = styled.div`
  margin-top: 21px;
`
