export const ToastTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
}

export const buildToast = (message, type, options) => ({
  message,
  type: ToastTypes[type] || ToastTypes.info,
  options,
})

export default (message, options, type = ToastTypes.info) => ({
  type: 'SHOW_TOAST',
  toast: buildToast(message, type, options),
})
