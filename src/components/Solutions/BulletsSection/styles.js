import styled from 'styled-components'

export const Container = styled.section`
  padding-top: 28px;
  padding-bottom: 28px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 1206px) {
    width: 1200px;
  }

  @media (max-width: 780px) {
    flex-wrap: wrap;
  }
`
export const LeftContent = styled.div`
  padding-left: 14px;
  padding-right: 14px;

  img {
    width: 450px;

    @media (max-width: 1200px) {
      width: 400px;
    }

    @media (min-width: 768px) {
      padding-right: 70px;
    }

    @media (max-width: 768px) {
      width: 300px;
    }
  }
`

export const RightContent = styled.div`
  padding-left: 14px;
  padding-right: 14px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  div {
    font-size: 34px;
    letter-spacing: 0.5px;
    line-height: 44px;
    font-weight: 300;

    @media (max-width: 980px) {
      font-size: 22px;
    }

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  ul {
    list-style-type: none;
    padding-left: 20px;
    margin-top: 28px;
  }

  li {
    position: relative;
    font-size: 18px;
    padding-left: 28px;
    line-height: 28px;
    font-weight: 300;
    color: black;
    margin-bottom: 14px;

    @media (max-width: 1000px) {
      font-size: 15px;
    }

    @media (max-width: 980px) {
      font-size: 14px;
      line-height: 19px;
    }

    &:before {
      content: '■';
      color: #ff7424;
      position: absolute;
      right: calc(100% + 10px);
      font-size: 14px;
    }
  }
`
