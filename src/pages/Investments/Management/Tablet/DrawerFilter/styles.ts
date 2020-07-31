import styled from 'styled-components'
import Button from 'components/Button'
import ButtonTag from 'components/Button/Tag'
import DrawerFilter from 'components/Drawer'
import Text from 'components/Text'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import CloseIcon from 'assets/icons/close.svg'
import { Row } from 'styled-bootstrap-grid'
import { DrawerBody, DrawerFooter } from 'components/Drawer/styles'
interface IButtonViewModeProps {
  iconViewMode: any
  backgroundcolor: 'primary' | 'secondary'
}
interface IGroupButtonViewModeProps {
  textColor: 'primary' | 'secondary'
}

export const Drawer = styled(DrawerFilter)`
  min-width: inherit;
  ${DrawerBody} {
    padding: 0;
  }

  ${DrawerFooter} {
    padding: 0;
  }
`
export const FilterDrawerBody = styled.div`
  padding: 0;
`
export const ContentView = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
`
export const ContentFunds = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
`
export const TitleContent = styled(Text)`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontTypes.subheading};
`
export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin: 0 ${({ theme }) => theme.spacing(2)}px;

  & + button {
    margin-left: 0;
  }
`
export const ViewModeRow = styled(Row)`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  margin: 0;
`
export const ButtonViewMode = styled.div<IButtonViewModeProps>`
  background-color: ${props =>
    props.backgroundcolor === 'primary'
      ? props.theme.colors.blue4
      : props.theme.colors.gray4};
  height: 21px;
  width: 21px;
  mask-image: url(${props => props.iconViewMode});
  transition: all ease 0.3s;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  margin-right: ${({ theme }) => theme.spacing(4)}px;
`

export const ViewModeGroupButton = styled.div<IGroupButtonViewModeProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fontTypes.subheading};
    color: ${props =>
      props.textColor === 'primary'
        ? props.theme.colors.blue4
        : props.theme.colors.gray4};
  }
`
export const ButtonTagStyled = styled(ButtonTag)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
export const FundsType = styled.div`
  display: block;
  max-width: 404px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`
export const FundsTypeRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  padding: 0;
`
export const FilterDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.lg} {
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
export const PrevButton = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
  mask-image: url(${ArrowLeft});
  background-color: ${({ theme }) => theme.colors.gray4};
  transition: all ease 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue4};
  }
`
export const CloseButton = styled.div`
  cursor: pointer;
  width: 28px;
  height: 28px;
  mask-image: url(${CloseIcon});
  background-color: ${({ theme }) => theme.colors.gray4};
  transition: all ease 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue4};
  }
`
