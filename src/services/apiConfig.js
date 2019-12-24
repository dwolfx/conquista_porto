/* eslint-disable import/no-mutable-exports */
let baseURL = ''

if (process.env.REACT_APP_ENV === 'local') {
  baseURL = 'http://localhost:5000/investimento'
} else {
  // a partir do momento que existir variáveis de ambiente nós devemos usar a REACT_APP_BASE_URL
  // baseURL = process.env.REACT_APP_BASE_URL
  baseURL = 'http://localhost:5000/investimento'
}

export { baseURL }
