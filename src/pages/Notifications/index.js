import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import { useSelector, useDispatch } from 'react-redux'

import NotificationItem from 'components/NotificationItem'
import Modal from 'components/Modal'
import Text from 'components/Text'

import useFetchNotifications from 'hooks/Notifications/useFetchNotifications'

import { SendNotificationReadRequest } from 'store/modules/Notifications/action'

import {
  GridContainer,
  NotificationsMessages,
  NotificationsArticle,
  PageTitle,
  ModalContent,
} from './styles'

export default function Notifications() {
  useFetchNotifications()

  const dispatch = useDispatch()
  const [modalData, setModalData] = useState({
    open: false,
    selectedData: null,
  })

  const notificationsData = useSelector(state => [
    ...state.notifications.data.novas,
    ...state.notifications.data.anteriores,
  ])

  return (
    <>
      <GridContainer>
        <Col>
          <NotificationsArticle>
            <PageTitle type="heading3">Notificações</PageTitle>
            <NotificationsMessages>
              {notificationsData.map(item => (
                <NotificationItem
                  key={item.idNotificacao}
                  title={item.titulo}
                  message={item.textoConteudo}
                  identificationIcon={
                    item.icon === 'ALERT' ? 'alertrounded' : 'add'
                  }
                  actionIcon={item.link ? 'arrowright' : 'add'}
                  isRead={item.lida}
                  onClick={() => {
                    if (!item.lida) {
                      dispatch(
                        SendNotificationReadRequest(
                          item.idNotificacao,
                          '36275312807'
                        )
                      )
                    }
                    if (!item.link) {
                      setModalData({ open: true, selectedData: item })
                    }
                  }}
                />
              ))}
            </NotificationsMessages>
          </NotificationsArticle>
        </Col>
      </GridContainer>
      <Modal
        isOpen={modalData.open}
        modalTitle={modalData.selectedData && modalData.selectedData.titulo}
        handleClose={() => setModalData({ open: false, selectedData: null })}
      >
        <ModalContent>
          <Text type="body">
            {modalData.selectedData && modalData.selectedData.descricaoLonga}
          </Text>
        </ModalContent>
      </Modal>
    </>
  )
}
