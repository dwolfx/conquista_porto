//https://github.com/moooji/logstash
// @ts-ignore
import createLogstash from 'logstash'
import packageJson from '../../package.json'

const url = 'https://logstash.conquista.sciensa.click'

// options
const tags = [process.env.REACT_APP_ENV, `v${packageJson.version}`]
const level = 'info'
const options = {
  retryDelay: 10000,
  concurrency: 25,
  maxMessagesPerSecond: 15,
  muteConsole: true,
}

// Create logger instance
const logger = createLogstash(url, tags, level, options)

const checkBaseURL = (serviceURL: string) =>
  serviceURL.includes(`${process.env.REACT_APP_BASE_URL_AUTH2}`) ||
  serviceURL.includes(`${process.env.REACT_APP_BASE_URL_LOGOUT}`) ||
  serviceURL.includes(`${process.env.REACT_APP_REMOTE_URL}`) ||
  serviceURL.includes(`${process.env.REACT_APP_SENSEDIA_URL_TOKEN}`) ||
  serviceURL.includes(`${process.env.REACT_APP_SENSEDIA_URL_LOGIN_SESSAO}`) ||
  serviceURL.includes(`${process.env.REACT_APP_SENSEDIA_URL_LOGIN_PORTAL}`)
    ? serviceURL
    : `${process.env.REACT_APP_BASE_URL}${serviceURL}`

export const loggerSucess = (
  serviceURL: string,
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  statusCode: number
) => {
  if (
    process.env.REACT_APP_ENV !== 'production' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    logger.info('Success', {
      service: checkBaseURL(serviceURL),
      method,
      statusCode,
    })
  }
}

export const loggerError = (
  serviceURL: string,
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  error: string
) => {
  if (
    process.env.REACT_APP_ENV !== 'production' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    logger.error('Error', {
      service: checkBaseURL(serviceURL),
      method,
      error,
    })
  }
}
