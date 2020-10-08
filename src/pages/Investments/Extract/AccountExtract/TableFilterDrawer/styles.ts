import styled from 'styled-components'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
// import ButtonTag from 'components/Button/Tag'
// import IconButton from 'components/Button/Icon'

export const FilterDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media ${props => props.theme.mediaQueries.lg} {
    margin: 0;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const HeaderColTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PrevButton = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const CloseButton = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin: 0 14px;

  & + button {
    margin-left: 0;
  }
`