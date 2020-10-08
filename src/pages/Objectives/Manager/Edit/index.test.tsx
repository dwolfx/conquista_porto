import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { fireEvent } from '@testing-library/react'

import EditDrawer from './index'

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

const editDrawerMock = {
  formDataMock: {
    nickname: '',
    target_date: '',
    target_value: 0,
    initial_value: 0,
    monthly_value: 0,
    goal_type: 0,
  },
  objectiveId: '1',
}

const setFormData = (data: any) => {
  editDrawerMock.formDataMock = data
}

describe('Edit Objective Drawer Component', () => {
  it('should render Edit Drawer title', async () => {
    renderWithReduxAndTheme(
      <HashRouter>
        <EditDrawer
          isDrawerOpen={true}
          onClose={() => {}}
          formData={editDrawerMock.formDataMock}
          setFormData={setFormData}
          objectiveId={editDrawerMock.objectiveId}
        />
      </HashRouter>,
      { container: createRootContainer() }
    )

    const menuElement = screen.getByText('Edite os dados preenchidos')
    expect(menuElement).toHaveTextContent(/^Edite os dados preenchidos$/)
  })
  it('handles delete button click closing the drawer', () => {
    const mockCloseDrawer = jest.fn()
    renderWithReduxAndTheme(
      <HashRouter>
        <EditDrawer
          isDrawerOpen={true}
          onClose={mockCloseDrawer}
          formData={editDrawerMock.formDataMock}
          setFormData={setFormData}
          objectiveId={editDrawerMock.objectiveId}
        />
      </HashRouter>,
      { container: createRootContainer() }
    )
    fireEvent.click(screen.getByText('Excluir objetivo'))
    expect(mockCloseDrawer).toBeCalled()
  })
})
