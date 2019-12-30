import styled from 'styled-components'
import Carousel from 'components/Carousel'

export const BreadcrumbContainer = styled.div`
  @media (max-width: 1000px) {
    padding-left: 30px;
  }
`
export const AddBtnLink = styled.div`
  border: 2px solid #d2d2d2;
  background-color: #f1f1f1;
  padding: 8px;
  margin-bottom: 30px;
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

export const Text = styled.span`
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || '300'};
  color: ${props => props.fontColor || '#000'};
  line-height: ${props => props.lineHeight || '24px'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '18px'};
  word-break: break-word;
  letter-spacing: ${props => props.letterSpacing || '0'};
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

export const MiddleContent = styled.article`
  background-color: white;
  padding-top: 22px;
  width: 90%;

  @media (max-width: 1000px) {
    width: 100%;
    order: 3;
  }
`
export const Topics = styled(Carousel)`
  display: flex;
  justify-content: space-between;
  margin: 28px 20px;
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

export const ComplementaryInfo = styled.article`
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 22px;
  padding-top: 15px;
`
export const RowContent = styled.div`
  display: flex;
  border-top: 1px solid #c7c7c7;
`
export const RowContentColumnDir = styled.div`
  display: flex;
  border-top: 1px solid #c7c7c7;
  flex-direction: column;
  padding: 28px 16px;
`
export const Column = styled.div`
  flex: 1;
  height: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const ColumnWithLine = styled.div`
  flex: 1;
  height: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid #c7c7c7;
`
export const LinearProgressTitleContent = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 15px;
`

export const LinearProgressContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
export const LinearProgressButtonContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 40px 0px;
`
export const VantagesContent = styled.div`
  background-color: white;
  display: flex;
  flex-flow: row wrap;
`

export const VantagesTitle = styled.div`
  padding: 28px 0px;
  flex-grow: 1;
  flex-basis: 100%;
  border-bottom: 1px solid #c7c7c7;
  text-align: center;
`
export const VantagesItem = styled.div`
  flex: 1;
  padding: 30px;
  border-right: 1px solid #C7C7C7
  display:grid;
  grid-template-columns: 1fr 5fr;
`
