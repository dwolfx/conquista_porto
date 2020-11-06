import React from 'react'

import Text from 'components/Text'

import * as S from '../styles'
import useMedia from 'hooks/useMedia'
import Divisor from 'components/Divisor'

interface IProps {
  document: {
    type: string,
    number: string,
    expeditionDate: string,
    emittingOrgan: string,
  }
}

const DocumentInfo = ({ document }: IProps) => {
  const isMobile = useMedia('sm')
  const labelTextType = isMobile ? 'captionUppercase' : 'caption'
  const labelColor = isMobile ? 'gray4' : 'gray5'

  const valueTextType = isMobile ? 'headline' : 'title'

 return (
   <S.Wrapper>
     <S.FlexWrapper>
       <S.KeyWrapper>
         <Text bold type={labelTextType} color={labelColor}>Documento</Text>
       </S.KeyWrapper>
       <S.ValueWrapper>
         <Text bold type={valueTextType} color="gray6">{document.type}</Text>
       </S.ValueWrapper>
     </S.FlexWrapper>
     {isMobile && <Divisor />}
     <S.FlexWrapper>
       <S.KeyWrapper>
         <Text bold type={labelTextType} color={labelColor}>Número</Text>
       </S.KeyWrapper>
       <S.ValueWrapper>
         <Text bold type={valueTextType} color="gray6">{document.number}</Text>
       </S.ValueWrapper>
     </S.FlexWrapper>
     {isMobile && <Divisor />}
     <S.FlexWrapper>
       <S.KeyWrapper>
         <Text bold type={labelTextType} color={labelColor}>Data de expedição</Text>
       </S.KeyWrapper>
       <S.ValueWrapper>
         <Text bold type={valueTextType} color="gray6">{document.expeditionDate}</Text>
       </S.ValueWrapper>
     </S.FlexWrapper>
     {isMobile && <Divisor />}
     <S.FlexWrapper>
       <S.KeyWrapper>
         <Text bold type={labelTextType} color={labelColor}>Orgão emissor</Text>
       </S.KeyWrapper>
       <S.ValueWrapper>
         <Text bold type={valueTextType} color="gray6">{document.emittingOrgan}</Text>
       </S.ValueWrapper>
     </S.FlexWrapper>
   </S.Wrapper>
 )
}

export default DocumentInfo
