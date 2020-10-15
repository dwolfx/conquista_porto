const fs = require('fs')
const path = require('path')
const configFile = require('./config')

const INDEX_PATH = path.join(__dirname, 'build/index.html')
const CHUNKS_PATH = path.join(__dirname, 'build/chunks')

const getContentBetweenTags = (tagStart, tagEnd) => fileContent =>
  fileContent.substring(
    fileContent.indexOf(tagStart) + tagStart.length,
    fileContent.indexOf(tagEnd)
  )

const getHeadContent = getContentBetweenTags('<head>', '</head>')
const getBodyContent = getContentBetweenTags('<body>', '</body>')

const replaceUrls = (config, content) =>
  content.replace(/\/conquista/g, `${config.baseUrl}/conquista`)

const main = async (fsValue, indexPath, chunksPath, config) => {
  try {
    const fileContent = await fsValue.readFileSync(indexPath, {
      encoding: 'utf-8',
    })
    const headContent = getHeadContent(fileContent)
    const bodyContent = getBodyContent(fileContent)
    const joinContent = headContent.concat(bodyContent)
    const finalContent = replaceUrls(config, joinContent)

    await fsValue.writeFileSync(chunksPath, finalContent, { encoding: 'utf-8' })
    console.log('EXTRACT BUNDLE SUCCESS')
  } catch (error) {
    console.error('===== EXTRACT BUNDLE FAIL =====')
    throw new Error(error)
  }
}

main(fs, INDEX_PATH, CHUNKS_PATH, configFile)
