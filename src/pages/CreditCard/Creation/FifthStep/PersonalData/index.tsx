import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import DataShower from '../DataShower'
import EditingPersonalData from '../EditingData/EditingPersonalData'

import * as S from './styles'

const PersonalData = () => {
  const personalData = {
    email: 'felipe.santos@sciensa.com',
    cpf: '131.507.476-19',
    birthDate: '14/02/1987',
    phoneNumber: '(11) 9 96862009',
    document: {
      type: 'RG',
      number: '171680334',
      expeditionDate: '23/06/2019',
      emittingOrgan: 'SSP/SP',
    },
    city: 'São Paulo',
    civilState: 'Solteiro',
    gender: 'Masculino',
    ocupation: 'Projetista',
    mothersName: 'Francisca de Oliveira Santos',
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <EditingPersonalData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={{ personalData }}
        setFormData={() => {}}
      />
      <S.StyledCard
        headerTitle={
          <Text type="subheading" bold color="gray5">
            DADOS PESSOAIS
          </Text>
        }
        headerEndItem={
          <Button onClick={() => setIsOpen(true)}>
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="E-mail" value={personalData.email} />
          <Divisor />
          <DataShower label="CPF" value={personalData.cpf} />
          <Divisor />
          <DataShower
            label="Data de nascimento"
            value={personalData.birthDate}
          />
          <Divisor />
          <DataShower label="Celular" value={personalData.phoneNumber} />
          {/* <Divisor />
       <DocumentInfo document={personalData.document}/> */}
          <Divisor />
          <DataShower label="Cidade" value={personalData.city} />
          <Divisor />
          <DataShower label="Estado Civil" value={personalData.civilState} />
          <Divisor />
          <DataShower label="Sexo" value={personalData.gender} />
          <Divisor />
          <DataShower label="Ocupação" value={personalData.ocupation} />
          <Divisor />
          <DataShower label="Nome da mãe" value={personalData.mothersName} />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default PersonalData
