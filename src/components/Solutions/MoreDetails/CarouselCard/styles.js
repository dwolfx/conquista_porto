import styled from 'styled-components'

const gray = '#E6E6E6'

export const CarouselItemWrapper = styled.div`
  border: 1px solid ${gray};
  border-radius: 0.5em;
  box-shadow: 0 45px 40px -50px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  height: 22.5em;
  margin: 0 auto;
  width: 16em;

  @media (min-width: 1200px) {
    width: 18em;
  }
`
export const IconWrapper = styled.div`
  height: 5em;
`

export const TextTitle = styled.p`
  color: #000;
  letter-spacing: 0;
  line-height: 32px;
  word-break: break-word;
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 15px;
`

export const TextLight = styled.p`
  color: #1c1c1c;
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
  font-weight: 300;
`

export const TextWrapper = styled.div`
  padding: 30px;
`

export const ImgDynamic = styled.img`
  width: 100%;
  margin: 0 auto;
`
