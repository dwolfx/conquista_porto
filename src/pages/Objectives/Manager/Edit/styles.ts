import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import {
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
} from 'components/Drawer/styles'

export const FormWrapper = styled.div``

export const ColInput = styled(Col as any)<{ error: boolean }>`
  padding: 0;

  &:not(:first-of-type) {
    margin-top: ${({ error, theme }) =>
      error ? '0' : `${theme.spacing(5)}px`};
  }
`

export const DrawerForm = styled(Drawer)`
  min-width: inherit;
  padding: ${({ theme }) => `${theme.spacing(2)}px`};

  ${DrawerHeader} {
    padding: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  ${DrawerBody} {
    padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px`};
  }

  ${DrawerFooter} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0`};
  }
`

export const ButtonSubmit = styled(Button)`
  width: 100%;
`

export const ButtonDeleteObjectiveModal = styled(Button)`
  width: auto !important;
`

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: ${({ theme }) =>
    `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};

  & svg {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const ButtonContainerModal = styled.div`
  padding-top: 56px;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  button {
    width: 180px;

    &:last-of-type {
      margin-left: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`
