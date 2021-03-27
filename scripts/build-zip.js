#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs')
const path = require('path')
// eslint-disable-next-line
var archiver = require('archiver')

const extPackageJson = require('../src/manifest.json')
const packageJson = require('../package.json')

const DEST_DIR = path.join(__dirname, '../dist')
const DEST_ZIP_DIR = path.join(__dirname, '../dist-zip')

const extractExtensionNameFromLocales = () => {
  const messagesPath = `../src/_locales/${
    extPackageJson.default_locale
  }/messages.json`
  const messages = require(messagesPath)
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
  let { name } = extPackageJson
  const { version } = packageJson
  if (name === '__MSG_extensionName__') {
    ;({ name } = extractExtensionNameFromLocales())
  }
  const zipFilename = `${name}-${version}.zip`

  makeDestZipDirIfNotExists()

  buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
}

main()
