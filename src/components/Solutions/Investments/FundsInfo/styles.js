import styled from 'styled-components'

import RiskDegreeComponent from 'components/RiskDegree'
import Text from 'components/Text'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;
  height: auto;
  border-radius: 8px;
  @media (max-width: 900px) {
    width: 490px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`
export const WrapperDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  align-items: center;
  justify-content: space-between;
  border-right: 2px solid ${props => props.theme.colors.gray3};
  @media (max-width: 900px) {
    width: 334px;
    section {
      div {
        flex-direction: column;
      }
    }
  }
  @media (max-width: 801px) {
    section {
      flex-direction: row;
    }
  }
  @media (max-width: 767px) {
    width: 66%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`
export const FundsDetailsSection = styled.section`
  display: flex;
  width: 100%;
  padding-top: 30px;
  background-color: ${props => props.theme.colors.gray1};
  @media (max-width: 900px) {
    width: 490px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 489px) {
    width: 100%;
    flex-direction: column;
  }
`
export const SubTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.black};
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.5px;
  padding: 30px;
  text-align: center;
`
export const Notification = styled.p`
  font-size: 10px;
  font-weight: 400;
  height: 22px;
  letter-spacing: 1.5px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  padding: 15px 30px 52px 30px;
  @media (max-width: 489px) {
    width: 100%;
    height: auto;
    padding: 0;
  }
`
export const RiskDegree = styled(RiskDegreeComponent)`
  margin-bottom: 30px;
  @media ${props => props.theme.mediaQueries.xs} {
    display: none;
  }
`
export const RiskDegreeTitle = styled.h5`
  color: ${props => props.theme.colors.gray6};
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
`

export const DownloadSection = styled.div`
  display: flex;
  background-color: ${props =>
    props.backgroundColor || props.theme.colors.gray1};
  justify-content: center;
  width: 100%;
`

export const DownloadItem = styled.div`
  display: flex;
  padding: 20px 20px;
`

export const DownloadIconWrapper = styled.div`
  margin-right: 20px;
`

export const DownloadTitle = styled(Text).attrs(() => ({ type: 'subheading' }))`
  text-transform: uppercase;
`
