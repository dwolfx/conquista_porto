import styled from 'styled-components'

export const CarouselCardWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: 0.5em;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 1px 45px 40px -50px rgba(0, 0, 0, 0.4);
  margin: 46px auto;
  display: flex;
  flex-direction: column;
  height: 22.5em;
  width: 24em;
`
export const IconWrapper = styled.div`
  height: 5em;
`

export const TextTitle = styled.p`
  color: ${props => props.theme.colors.black};
  letter-spacing: 0;
  line-height: 32px;
  word-break: break-word;
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 15px;
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
  padding: 30px;
`

export const ImgDynamic = styled.img`
  width: 100%;
  margin: 0 auto;
`
