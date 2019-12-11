import styled from 'styled-components'

export const Section = styled.section`
  padding: 60px 0 30px;
`

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const StepContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 0 auto;
  position: relative;

  &:before {
    content: '';
    background-color: #d7d7d7;
    height: 1px;
    width: 100%;
    position: absolute;
    top: calc(25% - 4px);
    left: 0;
    z-index: 0;
    display: block;
  }
`

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BulletPoint = styled.div`
  background-color: ${props =>
    props.filled ? props.theme.colors.blue4 : '#d7d7d7'};
  height: 15px;
  width: 15px;
  border-radius: 50%;
  position: relative;
`

export const StepNumber = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
`
