import styled from 'styled-components'

import PencilSVG from 'assets/icons/pencil.svg'
import breakpoints from 'styles/breakpoints'
import theme from 'styles/theme'

export const Wrapper = styled.div`
  background-color: ${theme.colors.backgroundColor};
  flex: 1;
  padding-top: 30px;
`

export const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding-bottom: 30px;
  min-height: 100vh;

  @media ${breakpoints.mobile} {
    width: 100%;
    flex-direction: column-reverse;
  }
`

export const Content = styled.div`
  width: 75%;
  margin-left: 15px;
  padding-left: 15px;

  @media ${breakpoints.mobile} {
    margin: 0;
    padding: 0 15px;
    width: 100%;
  }
`

export const PerfilTitle = styled.p`
  color: ${theme.colors.lightPrimary};
  font-size: 18px;
  margin-bottom: 30px;
`

export const SectionSubtitle = styled.h4`
  font-size: 11px;
  font-weight: 600;
  color: #1c1c1c;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`

export const SectionText = styled.div`
  font-size: 14px;
  font-weight: 300;
`

export const Row = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : '30px'};
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}` : '0')};
  margin-right: ${props => (props.marginRight ? `${props.marginRight}` : '0')};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : '30px')};
  width: ${props => (props.width ? `${props.width}%` : '100%')};

  @media ${breakpoints.mobile} {
    flex-direction: ${props => (props.bankInfos ? 'row' : 'column')};
    margin-bottom: 15px;
    margin-top: 15px;
  }
`

export const ButtonAdd = styled.button`
  color: #30c5ff;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`

export const ObsText = styled.small`
  font-weight: 300;
  color: #1c1c1c;
  letter-spacing: 0;
  line-height: 18px;
  word-break: break-word;
  font-size: 11px;
  width: 100%;
`

export const LabelText = styled.p`
  font-weight: 400;
  color: #1c1c1c;
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
  width: 100%;
`
export const CardWrapper = styled.div`
  background-color: #fff;
  display: flex;
  margin-bottom: 30px;
  padding: 15px 30px 30px;

  @media ${breakpoints.mobile} {
    flex-direction: column;
  }
`

export const PhotoWrapper = styled.div`
  width: 98px;
  height: 98px;
  position: relative;

  img {
    border-radius: 50%;
    width: 100%;
  }

  @media ${breakpoints.mobile} {
    align-self: center;
    margin-bottom: 15px;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  padding-left: 30px;
  padding-right: 7rem;

  @media ${breakpoints.mobile} {
    padding: 0;
  }
`

export const CardText = styled.p`
  font-size: ${props => (props.title ? '11px' : '14px')};
  font-weight: ${props => (props.title ? '600' : '400')};
  color: #1c1c1c;
  letter-spacing: ${props => (props.title ? '1.5px' : 'normal')};
  text-transform: ${props => (props.title ? 'uppercase' : 'normal')};
  line-height: 21px;
`

export const CardBox = styled.div`
  flex: 1;
`

export const LineBreaker = styled.div`
  flex: 1;
  border-bottom: 1px solid #d2d2d2;
`

export const PencilIcon = styled.div`
  background-color: #d2d2d2;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;

  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    mask-image: url(${PencilSVG});
    background-color: #fff;
  }
`

export const Box = styled.div`
  background-color: ${props => (props.transparent ? 'transparent' : '#fff')};
  margin-bottom: 30px;
  padding: ${props => (props.padding ? props.padding : '30px')};
`

export const BoxContent = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
`

export const BoxTitle = styled.h4`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '22px')};
  text-align: ${props => (props.align ? props.align : 'left')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
  font-weight: ${props => (props.subtitle ? '600' : '300')};
  line-height: 32px;
  margin-bottom: 30px;
`

export const BoxText = styled.p`
  color: #1c1c1c;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: 300;
  letter-spacing: 0;
  line-height: ${props =>
    props.lineHeight ? `${props.lineHeight}px` : '24px'};
  text-align: ${props => (props.align ? props.align : 'left')};
  word-break: break-word;
`

export const IconWrapper = styled.div`
  border: 4px solid #d2d2d2;
  border-radius: 50%;
  width: 98px;
  height: 98px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`

export const DownloadLink = styled.a`
  align-items: center;
  color: #1c1c1c99;
  cursor: pointer;
  display: flex;
  font-size: 14px;

  svg {
    margin-right: 8px;
  }
`

export const GreySection = styled.section`
  background-color: ${theme.colors.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  padding: 30px;
`

export const ModalSectionTitle = styled.h4`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 15px;
  text-align: center;
`

export const ModalSectionText = styled.p`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: 400;
  padding: 0 90px;
  text-align: center;
`

export const InputCode = styled.input.attrs({ type: 'number' })`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #d2d2d2;
  color: ${theme.colors.lightPrimary};
  font-size: 34px;
  font-weight: 300;
  margin: 0 auto;
  text-align: center;
  width: 330px;
`

export const DarkGreySection = styled.section`
  background-color: #555861;
`
