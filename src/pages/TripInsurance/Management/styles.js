import styled from 'styled-components'

import ModalDefault from 'components/Modal'
import { ModalContainer } from 'components/Modal/styles'
import Carousel from 'components/Carousel'

export const AddBtnLink = styled.div`
  border: 2px solid #d2d2d2;
  background-color: #f1f1f1;
  padding: 8px;
  margin-bottom: 30px;
  min-width: 150px;
  padding: 14px;
  cursor: pointer;
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  :hover {
    box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }

  @media (max-width: 1000px) {
    width: 150px;
  }
`

export const PageTitle = styled.h4`
  font-weight: 300;
  color: #000;
  letter-spacing: 0;
  word-wrap: break-word;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
`

export const Topics = styled(Carousel)`
  display: flex;
  justify-content: space-between;
  margin: 28px 70px;
`

export const Topic = styled.div`
  display: flex !important;
  justify-content: center;

  svg {
    margin-right: 16px;
  }
`

export const TopicTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const TopicValue = styled.span`
  font-weight: 300;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
`

export const Section = styled.article`
  padding: 22px;
  border-top: 1px solid #ccc;
`

export const PeriodContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  justify-content: center;
`

export const Period = styled.div`
  padding: 22px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Text = styled.span`
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || '300'};
  color: ${props => props.fontColor || props.theme.colors.black};
  line-height: ${props => props.lineHeight || '24px'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '18px'};
  word-break: break-word;
  letter-spacing: ${props => props.letterSpacing || '0'};
`

export const Invoice = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InvoiceItem = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  background-color: #f1f1f1;
  padding: 14px 0;
  border-radius: 4px;
  margin-bottom: 14px;

  ${Text} {
    text-transform: lowercase;

    ::first-letter {
      text-transform: capitalize;
    }
  }
`

export const Modal = styled(ModalDefault)`
  ${ModalContainer} {
    width: 490px;

    @media (max-width: 768px) {
      width: calc(100vw - 30px);
    }
  }
`

export const ModalContent = styled.div`
  padding: 30px 22px;
`

export const Divider = styled.div`
  border-top: 1px solid #ddd;
`

export const ShowAll = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.blue4};
  font-weight: 600;

  :hover {
    color: #2591bb;
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.margin || 'unset'};
`

export const MiddleContent = styled.article`
  background-color: ${props => props.theme.colors.white};
  padding-top: 22px;
  width: 90%;

  @media ${props => props.theme.mediaQueries.md} {
    width: 100%;
    order: 3;
  }
`
