import { toast } from 'react-toastify'

const toastMiddleware = () => next => action => {
  if (action.toast) {
    const { message, ...options } = action.toast
    toast(message, {
      ...options,
    })
  }
  return next(action)
}

export default toastMiddleware
