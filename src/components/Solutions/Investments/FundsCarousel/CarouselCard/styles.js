import styled from 'styled-components'

export const CarouselCardWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.gray2};
  background-color: ${props => props.theme.colors.white};
  border-radius: 0.5em;
  box-shadow: 1px 45px 40px -50px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  height: 22.5em;
  margin: 46px auto;
  width: 16em;

  @media (min-width: 1200px) {
    width: 18em;
  }
`
export const IconWrapper = styled.div`
  margin-top: 1em;
  height: 5em;
`

export const TextLight = styled.p`
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
  font-weight: 300;
`

export const TextWrapper = styled.div`
  padding: 2em;
`

export const ImgDynamic = styled.img`
  margin: 0 auto;
`
