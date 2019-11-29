import styled from 'styled-components'

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
