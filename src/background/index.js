import browser from 'webextension-polyfill'

import { IS_DEV_MODE } from '../common/config'
import { EXAMPLE_KEY } from '../common/keys'
import { EXAMPLE_PATTERN } from '../common/match.patterns'
import { delay } from '../common/utility'

// ##### Methods

const init = async () => {
  await delay(1)
  console.log('%cBackground script started...', 'color:orange')
}

// ##### Handlers

// On Install Handler
const onInstallHandler = async installDetails => {
  await browser.storage.local.set({})
  console.log({ installDetails })
}

// On Web Request Completed Handler
const onWebRequestCompletedHandler = async webRequestDetails => {
  console.log({ webRequestDetails })
}

// On Runtime Message Handler
const onRuntimeMessageHandler = (request, sender) => {
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
      return new Promise(async resolve => {
        resolve({ message: 'Default Resolver' })
      })
    }
  }
}

// ##### Listeners

// On Install Listener
browser.runtime.onInstalled.addListener(onInstallHandler)

// On Web Request Completede Listener
browser.webRequest.onCompleted.addListener(onWebRequestCompletedHandler, {
  urls: [
    /* *** Make sure you add the links to your manifest file *** */
    EXAMPLE_PATTERN
  ]
})

// On Runtime Message Listener
browser.runtime.onMessage.addListener(onRuntimeMessageHandler)

init()
