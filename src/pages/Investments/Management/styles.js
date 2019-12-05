import styled from 'styled-components'
import AccordionDefault from 'components/Accordion'
import { AccordionHeader, AccordionBody } from 'components/Accordion/styles'
import Carousel from 'components/Carousel'

export const MiddleContent = styled.article`
  background-color: white;
  padding-top: 22px;
  width: 55%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const GeneralInfo = styled.article`
  background-color: white;
  width: 25%;
  margin-left: 30px;
  height: fit-content;
`

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
  color: #1c1c1c;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const TopicValue = styled.span`
  font-weight: 300;
  color: #1c1c1c;
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
`

export const Accordion = styled(AccordionDefault)`
  margin: 20px 30px;
  ${AccordionHeader} {
    background-color: #f1f1f1;
    &:hover {
      background-color: #e4e4e4;
    }
  }

  ${AccordionBody} {
    padding: 0;
  }
`

export const Section = styled.article`
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-top: 1px solid #ccc;
`

export const HeaderNodeAccordion = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

export const CurrentBalance = styled.div`
  padding: 12px 40px;
  background-color: #eeeeee90;
`

export const GrossIncome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;
  padding: 15px 21px;
  border-radius: 3px;
  background-color: ${props => props.theme.colors.backgroundColor};
`

export const ChartContainer = styled.div`
  height: 400px;
  width: 570px;

  @media (max-width: 1000px) {
    width: 100vw;
  }
`

export const ChartTooltip = styled.div`
  background-color: black;
  opacity: 0.5;
  padding: 2px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;

  span {
    color: white;
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

export const SectionCustomPicture = styled.section`
  padding: 0;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
`

export const CustomContent = styled.div`
  display: flex;
  margin: 0 auto;

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media (max-width: 1000px) {
    text-align: center;
    padding: 0 8px 22px 8px;
  }
`

export const Picture = styled.picture`
  overflow: hidden;

  img {
    margin-left: -350px;
    height: 100%;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`

export const DescriptionContent = styled.div`
  padding-top: 22px;
  h1 {
    padding-bottom: 30px;
    font-size: 34px;
    -webkit-letter-spacing: 0.5px;
    -moz-letter-spacing: 0.5px;
    -ms-letter-spacing: 0.5px;
    letter-spacing: 0.5px;
    line-height: 44px;
    font-weight: 300;
    color: black;
  }

  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 28px;
    padding-right: 16px;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  margin-top: 22px;

  thead {
    background-color: #d6d6d6;
    tr {
      th {
        padding: 22px 0;
        font-size: 11px;
        font-weight: 300;
        color: #000;
        letter-spacing: 1px;
        text-transform: uppercase;
        line-height: 14px;
      }
    }
  }

  tbody {
    tr {
      td {
        color: #1c1c1c;
        font-size: 11px;
        letter-spacing: 1px;
        line-height: 14px;
        text-align: center;
        border: 1px solid #d2d2d2;
        width: 150px;
        padding: 22px 20px;
        text-transform: uppercase;
        opacity: 0.9;
      }
    }
  }
`

export const RowBankTransition = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
  border-top: ${props => props.borderTop || 'unset'};
`

export const BankTransitionDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CompleteExtract = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #30c5ff;
  margin-top: 22px;
  font-weight: 600;

  :hover {
    color: #2591bb;
  }
`

export const ComplementaryInfo = styled.article`
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 22px;
`

export const AnbimaContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 46px;
  padding: 0 6px;

  @media (max-width: 550px) {
    img {
      width: 320px;
    }
  }
`
