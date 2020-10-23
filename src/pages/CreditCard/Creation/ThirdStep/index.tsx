import React, { useState } from 'react'

import { dict } from 'components/IconExporter'
import Divisor from 'components/Divisor'

import CivilState from './Selects/CivilState'
import Sex from './Selects/Sex'
import Ocupation from './Selects/Ocupation'
import * as S from './styles'

export interface IOption {
  id: number,
  name: string
}

interface IProps {
  onNextStep: () => void
}

const Step3 = ({ onNextStep }: IProps) => {
  const cityError = {
    icon: 'information' as keyof typeof dict,
    message: 'A cidade informada não é válida.'
  }
  const motherNameError = {
    icon: 'information' as keyof typeof dict,
    message: 'O nome informado não é válido.'
  }
  const [city, setCity] = useState('São Paulo')
  const [motherName, setMotherName] = useState('Francisca de Oliveira Santos')
  const [selectedCivilState, setSelectedCivilState] = useState<IOption>({ id: 1, name: 'Solteiro' })
  const [selectedSex, setSelectedSex] = useState<IOption>({ id: 1, name: 'Masculino' })
  const [selectedOcupation, setSelectedOcupation] = useState<IOption>({ id: 1, name: 'Projetista' })

  const [loading, setLoading] = useState(false)

  const handleOnClick = () => {
    setLoading(true)
    onNextStep()
    setLoading(false)
  }

 return (
   <S.Wrapper>
     <S.StyledMain xs={12} sm={6} lg={4}>
       <S.StyledText>Agora confirme alguns dados do seu cadastro:</S.StyledText>
       <S.StyledForm>
         <S.FlexWrapper>
          <>
             <CivilState selectedOption={selectedCivilState} setSelectedOption={setSelectedCivilState} />
          </>
           <>
             <Sex selectedOption={selectedSex} setSelectedOption={setSelectedSex} />
           </>
         </S.FlexWrapper>

         <>
           <Ocupation selectedOption={selectedOcupation} setSelectedOption={setSelectedOcupation} />
         </>

         <S.StyledInput
          label="cidade"
          error={!city.length && cityError}
          value={city}
          onChange={e => setCity(e.target.value)}/>

         <S.StyledInput
          label="nome da mãe"
          error={!motherName.length && motherNameError}
          value={motherName}
          onChange={e => setMotherName(e.target.value)}/>

         <S.StyledButton
          disabled={!city.length || !motherName.length}
          onClick={() => handleOnClick()}
          loading={loading}
         >
           próximo
        </S.StyledButton>

         <S.Footer>
           <Divisor />
           <S.AnotherStyledText>
             Não se preocupe, a solicitação só será enviada após informarmos o cartão disponível para você.
           </S.AnotherStyledText>
         </S.Footer>
       </S.StyledForm>
     </S.StyledMain>
   </S.Wrapper>
 )
}

export default Step3
