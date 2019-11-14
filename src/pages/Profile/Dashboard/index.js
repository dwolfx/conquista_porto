import React, { useState } from 'react'
import UncompleteProfile from './InitialDashboard'
import CompletedProfile from './CompletedDashboard'
import Sidebar from '../../../components/Sidebar'
import Modal from '../../../components/Modal'
import {
  initialDashBoardSidebar,
  completedDashboardSidebar,
} from '../sidebarConfig'

const Dashboard = ({ profileIsCompleted }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (!profileIsCompleted) {
    return (
      <>
        <Sidebar sidebarItems={initialDashBoardSidebar} />
        <UncompleteProfile />
        <Modal
          modalTitle="Meu parceiro"
          headerIcon="link"
          isOpen={modalIsOpen}
          handleClose={() => setModalIsOpen(!modalIsOpen)}
        >
          <div>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum feugiat, diam vel sodales vehicula, neque turpis
              ultricies neque, eget molestie leo orci eu nibh. Nunc neque
              sapien, hendrerit in suscipit in, elementum eu lorem. Aliquam
              sodales risus a mollis rutrum. In aliquam, libero ut molestie
              tempus, nibh erat ultricies tortor, eget tempus tellus arcu eu
              nisl. Vivamus dignissim, magna in facilisis ultrices, lorem ligula
              facilisis ligula.
            </p>
            <h3>Qual o código enviado pelo seu parceiro</h3>
          </div>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Sidebar sidebarItems={completedDashboardSidebar} />
      <CompletedProfile />

      <Modal
        modalTitle="Meu parceiro"
        headerIcon="link"
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen(!modalIsOpen)}
      >
        <div>
          <h3>Lorem ipsum</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            feugiat, diam vel sodales vehicula, neque turpis ultricies neque,
            eget molestie leo orci eu nibh. Nunc neque sapien, hendrerit in
            suscipit in, elementum eu lorem. Aliquam sodales risus a mollis
            rutrum. In aliquam, libero ut molestie tempus, nibh erat ultricies
            tortor, eget tempus tellus arcu eu nisl. Vivamus dignissim, magna in
            facilisis ultrices, lorem ligula facilisis ligula.
          </p>
          <h3>Qual o código enviado pelo seu parceiro</h3>
        </div>
      </Modal>
    </>
  )
}

export default Dashboard
