const fs = require('fs')
const path = require('path')
const ASSET_PATH = path.join(__dirname, 'build/asset-manifest.json')
const CHUNK_MAIN_PATH = path.join(__dirname, 'build/chunkMain.js')
const CHUNK_RUNTIME_PATH = path.join(__dirname, 'build/chunkRuntime.js')
const CHUNK_VENDOR_PATH = path.join(__dirname, 'build/chunkVendor.js')
const CHUNK_CSS_PATH = path.join(__dirname, 'build/chunkStyle.css')

const getAssets = async assetPath =>
  JSON.parse(await fs.readFileSync(assetPath, { encoding: 'utf-8' }))

const matchFile = (fileName, nameToMatch) => nameToMatch.test(fileName)

const getMainFile = async entrypoints => {
  const pathFile = entrypoints.filter(fileName =>
    matchFile(fileName, new RegExp(/js\/main(.*?).chunk.js/))
  )[0]

  return fs.readFileSync(path.join(__dirname, 'build', pathFile), {
    encoding: 'utf-8',
  })
}

const getVendorFile = async entrypoints => {
  const pathFile = entrypoints.filter(fileName =>
    matchFile(fileName, new RegExp(/^((?!main).)*js$/))
  )[0]
  return fs.readFileSync(path.join(__dirname, 'build', pathFile), {
    encoding: 'utf-8',
  })
}

const getCssFile = async entrypoints => {
  const pathFile = entrypoints.filter(fileName =>
    matchFile(fileName, new RegExp(/^((?!main).)*css$/))
  )[0]
  return fs.readFileSync(path.join(__dirname, 'build', pathFile), {
    encoding: 'utf-8',
  })
}

const changeRunTimeFile = async entrypoints => {
  const pathFile = entrypoints.filter(fileName =>
    matchFile(fileName, new RegExp(/js\/runtime(.*?).js/))
  )[0]

  fs.readFile(path.join(__dirname, 'build', pathFile), function(err, data) {
    if (err) {
      console.log(err)
      return
    }

    const result = data
      .toString()
      .replace(/\/conquista/g, 'http://qa.conquista.sciensa.click/conquista')

    console.log(result)

    fs.writeFile(
      path.join(__dirname, 'build', pathFile),
      result,
      'utf8',
      function(erro) {
        if (erro) {
          throw erro
        }
      }
    )
  })
}

const getRuntimeFile = async entrypoints => {
  const pathFile = entrypoints.filter(fileName =>
    matchFile(fileName, new RegExp(/js\/runtime(.*?).js/))
  )[0]
  return fs.readFileSync(path.join(__dirname, 'build', pathFile), {
    encoding: 'utf-8',
  })
}

const main = async () => {
  try {
    const assets = await getAssets(ASSET_PATH)

    const mainFile = await getMainFile(assets.entrypoints)
    await fs.writeFileSync(CHUNK_MAIN_PATH, mainFile, { encoding: 'utf-8' })

    const vendorFile = await getVendorFile(assets.entrypoints)
    await fs.writeFileSync(CHUNK_VENDOR_PATH, vendorFile, { encoding: 'utf-8' })

    const cssFile = await getCssFile(assets.entrypoints)
    await fs.writeFileSync(CHUNK_CSS_PATH, cssFile, { encoding: 'utf-8' })

    // await changeRunTimeFile(assets.entrypoints)
    const runtimeFile = await getRuntimeFile(assets.entrypoints)
    const newRuntimeFile = runtimeFile
      .toString()
      .replace(/\/conquista/g, process.env.REACT_APP_REMOTE_URL)
    await fs.writeFileSync(CHUNK_RUNTIME_PATH, newRuntimeFile, {
      encoding: 'utf-8',
    })
    console.log('CHUNK SUCCESS')
  } catch (error) {
    console.error(error)
  }
}
main()
