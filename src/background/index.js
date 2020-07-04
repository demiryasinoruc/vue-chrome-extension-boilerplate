import browser from 'webextension-polyfill'

import { IS_DEV_MODE } from '../common/config'
import {} from '../common/keys'
import { delay } from '../common/utility'

// On Install handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

// On Message handler
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.type === 'SIGN_CONNECT') {
    return true
  }
  const { action, info } = request
  if (info) {
    console.log({ sender, action })
  }
  switch (action) {
    default:
      return new Promise(resolve => {
        resolve({ message: 'Default Resolver' })
      })
  }
})

const start = async () => {
  console.log('%cBackground script started...', 'color:orange')
}

start()
