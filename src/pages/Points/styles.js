import styled from 'styled-components'
import Carousel from '../../components/Carousel'

export const PointsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 28px 0;
  background-color: #f1f1f1;
`

export const PointsWrapper = styled(Carousel)`
  margin-top: 14px;
  display: flex;
  padding: 3em;
`

export const PointText = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #1c1c1c;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const Point = styled.div`
  border: 1px solid #ccc;
  width: 230px;
  height: 200px;
  margin: 0 4px 35px 4px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 1px 45px 40px -50px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
`

export const PointHeadline = styled.p`
  font-size: ${props => `${props.fontSize}px`};
  line-height: 28px;
  font-weight: 300;
  color: ${props => props.colorText || '#000'};
  letter-spacing: 0;
  word-wrap: break-word;
`

export const GoToLink = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #30c5ff;

  :hover {
    color: #2591bb;
  }
`

export const RescuePointsSection = styled.section`
  padding: 28px 0;
  background-color: #115fa5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 300px; /* vai mudar quando for inserido conteúdo nessa seção*/
`

export const RescuePointsTitle = styled.p`
  color: white;
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
  letter-spacing: 0;
  word-wrap: break-word;
`

export const RelationshipProgramSection = styled.section`
  padding: 28px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RelationshipProgramTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #1c1c1c;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
  text-align: center;
`

export const RelationshipProgram = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  width: 100%;
  margin-top: 28px;

  @media (max-width: 768px) {
    display: initial;
  }
`

export const RelationshipProgramItem = styled.div`
  display: flex;
  align-items: center;
  border-color: #d2d2d2;
  border-style: solid;
  padding: 30px;

  p {
    font-weight: 300;
    margin-left: 38px;
    color: #1c1c1c;
    letter-spacing: 0;
    line-height: 24px;
    word-break: break-word;
    font-size: 14px;
  }

  @media (max-width: 770px) {
    border-width: 1px 0 0 0;
    :last-child {
      border-bottom-width: 1px;
    }
  }

  @media (min-width: 768px) {
    border-width: 1px 1px 1px 0;
    :nth-child(1) {
      border-bottom: none;
    }
    :nth-child(2) {
      border-bottom: none;
    }
    :nth-child(3) {
      border-bottom: none;
      border-right: none;
    }
  }
`

export const BenefitsSection = styled.section`
  padding: 28px 0;
  background-color: #f1f1f1;
`

export const BenefitsSectionContent = styled.div`
  margin: 0 auto;

  @media (min-width: 1206px) {
    width: 1200px;
  }
`

export const BenefitsTitle = styled.h5`
  font-size: 34px;
  letter-spacing: 0.5px;
  line-height: 44px;
  font-weight: 300;
  color: #000;
  letter-spacing: 0;
  word-wrap: break-word;
  margin-bottom: 14px;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 22px;
    line-height: 32px;
  }
`

export const BenefitsDescription = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
  color: #000;
  letter-spacing: 0;
  word-wrap: break-word;
  margin-bottom: 14px;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 22px;
  }
`

export const BenefitsItems = styled.div`
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const BenefitItem = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 14px;

  @media (max-width: 800px) {
    flex-direction: row;
    width: auto;
    margin: 8px 14px;
  }

  p {
    text-align: center;
    margin-bottom: 7px;
    font-size: 18px;
    line-height: 28px;
    font-weight: 300;
    color: #000;
    letter-spacing: 0;
    word-wrap: break-word;

    @media (max-width: 800px) {
      text-align: left;
    }
  }

  p:last-child {
    line-height: 24px;
    word-break: break-word;
    font-size: 14px;
  }

  img {
    border-radius: 8px;
    width: 100%;

    @media (max-width: 800px) {
      margin-right: 28px;
      width: 20%;
    }
  }
`
