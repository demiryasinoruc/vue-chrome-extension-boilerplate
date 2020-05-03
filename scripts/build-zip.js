#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
// eslint-disable-next-line
var archiver = require('archiver')

const extPackageJson = require('../src/manifest.json')

const DEST_DIR = path.join(__dirname, '../dist')
const DEST_ZIP_DIR = path.join(__dirname, '../dist-zip')

const extractExtensionData = () => ({
  name: extPackageJson.name,
  version: extPackageJson.version,
})

const extractExtensionNameFromLocales = () => {
  const messages = require('../src/_locales/tr/messages.json')
  return {
    name: messages.extensionName.message
  }
}

const makeDestZipDirIfNotExists = () => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR)
  }
}

const buildZip = (src, dist, zipFilename) => {
  console.info(`Building ${zipFilename}...`)

  const output = fs.createWriteStream(path.join(dist, zipFilename))
  const archive = archiver('zip')
  archive.pipe(output)
  archive.directory(src, false)
  archive.finalize()
}

const main = () => {
  const data = extractExtensionData()
  let { name } = data
  const { version } = data
  if (name === '__MSG_extensionName__') {
    ({ name } = extractExtensionNameFromLocales())
  }
  const zipFilename = `${name}-${version}.zip`

  makeDestZipDirIfNotExists()

  buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
}

main()
