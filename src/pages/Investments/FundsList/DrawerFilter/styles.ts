import styled from 'styled-components'

import Button from 'components/Button'
import ButtonTag from 'components/Button/Tag'
import IconButton from 'components/Button/Icon'
import Icon from 'components/IconExporter'
// import Drawer from 'components/Drawer'

export const ButtonTagStyled = styled(ButtonTag)``

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

export const FilterDrawerBody = styled.div`
  padding: 0;

  @media ${props => props.theme.mediaQueries.lg} {
    margin: 0;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(4)}px
      ${({ theme }) => theme.spacing(3)}px;
  }
`

interface ICustomRow {
  margin: string
}
export const CustomRow = styled.div<ICustomRow>`
  margin: ${props => props.margin};
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
export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin: 0 14px;

  & + button {
    margin-left: 0;
  }
`

export const CloseButton = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`
export const ButtonContainer = styled.div`
  margin: 14px 0 21px 0;
  display: flex;
  flex-wrap: wrap;

  ${ButtonTagStyled} {
    margin: 0 7px 7px 0;
  }
`

export const FloatButton = styled(IconButton)`
  content: '';
  border-radius: 50%;
  position: fixed;
  bottom: 14px;
  right: 14px;
  z-index: 11;
  border: none;
`
