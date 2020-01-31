const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  baseUrl: process.env.REACT_APP_BASE_URL,
}
