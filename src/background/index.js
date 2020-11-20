import browser from 'webextension-polyfill'

import { IS_DEV_MODE } from '../common/config'
import { EXAMPLE_KEY } from '../common/keys'
import { EXAMPLE_PATTERN } from '../common/match.patterns'
import { delay } from '../common/utility'

// On Install handler
chrome.runtime.onInstalled.addListener(async installDetails => {
  await browser.storage.local.set({})
  console.log({ installDetails })
})

// On Message handler
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.type === 'SIGN_CONNECT') {
    return true
  }
  const { action, info } = request
  if (IS_DEV_MODE && info) {
    console.log({ sender, action })
  }
  switch (action) {
    case EXAMPLE_KEY: {
      return new Promise(async resolve => {
        resolve({ message: 'this is example' })
      })
    }
    default: {
      return new Promise(resolve => {
        resolve({ message: 'Default Resolver' })
      })
    }
  }
})

const init = async () => {
  await delay(1)
  console.log('%cBackground script started...', 'color:orange')
}

init()

browser.webRequest.onCompleted.addListener(
  async webRequestDetails => {
    console.log({ webRequestDetails })
  },
  {
    urls: [EXAMPLE_PATTERN]
  }
)
