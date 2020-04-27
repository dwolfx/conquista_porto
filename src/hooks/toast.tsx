import React, { createContext, useContext, useCallback, useState } from 'react'
import { uuid } from 'uuidv4'
import NewToastContainer from 'components/NewToastContainer'

export interface IToast {
  id: string
  type: 'success' | 'error'
  title: string
  description: string
}

interface ToastContextData {
  addToast(toast: Omit<IToast, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = useCallback((data: Omit<IToast, 'id'>) => {
    const { title, description, type } = data || {}
    const id = uuid()
    const toast = {
      id,
      title,
      description,
      type,
    }
    setToasts(prevState => [...prevState, toast])
  }, [])

  const removeToast = useCallback(id => {
    setToasts(prevState => prevState.filter(toast => toast.id !== id))
  }, [])
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <NewToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
