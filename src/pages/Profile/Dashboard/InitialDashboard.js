/* eslint-disable react/no-array-index-key */
import React from 'react'
import Button from '../../../components/Button'
import Icon from '../../../components/IconExporter'
import PhoneBox from '../../../components/PhoneInfos'
import TextInput from '../../../components/Inputs/Text'
import {
  Content,
  Box,
  BoxTitle,
  BoxContent,
  BoxText,
  ButtonContainer,
  Row,
  ButtonAdd,
  IconWrapper,
} from '../styles'

export default () => (
  <Content>
    <Box transparent padding="0 30px 30px ">
      <BoxTitle fontSize={34} align="center">
        Complete seu cadastro
      </BoxTitle>
      <BoxText fontSize={18} lineHeight={28} align="center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.quis nostrud exercitation ullamco laboris nisi ut
        aliquip.
      </BoxText>
      <ButtonContainer>
        <Button color="secondary">Completar cadastro</Button>
      </ButtonContainer>
    </Box>

    <Box>
      <BoxContent direction="row">
        <IconWrapper>
          <Icon name="user" fill="#d2d2d2" width={90} />
        </IconWrapper>
        <div>
          <BoxTitle>Descubra seu perfil de investidor</BoxTitle>
          <BoxText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </BoxText>
        </div>
      </BoxContent>
      <ButtonContainer>
        <Button>Preencher Questionário</Button>
      </ButtonContainer>
    </Box>

    <Box>
      <BoxTitle subtitle uppercase fontSize={11} align="center">
        Dados pessoais
      </BoxTitle>
      <Row>
        <TextInput label="Nome" name="nome" width={60} paddingRight={15} />
        <TextInput label="CPF" name="cpf" width={40} paddingLeft={15} />
      </Row>
      <Row>
        <TextInput label="Data de nascimento" name="dtNascimento" width={30} />
      </Row>
    </Box>

    <Box>
      <BoxTitle subtitle uppercase fontSize={11} align="center">
        Dados cadastrais
      </BoxTitle>
      <Row>
        <PhoneBox />
      </Row>
      <Row>
        <ButtonAdd>
          <Icon name="add" fill="currentColor" width={20} />
          Adicionar conta
        </ButtonAdd>
      </Row>
    </Box>

    <ButtonContainer>
      <Button color="primary">Salvar alterações</Button>
    </ButtonContainer>
  </Content>
)
