import browser from 'webextension-polyfill'

import { } from '../common/config'
import { } from '../common/keys'
import { delay } from '../common/utility'


// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

// OnMessage handler
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.type === "SIGN_CONNECT") {
    return true
  }
  const { action } = request
  console.log({ sender, action })
  switch (action) {
    default:
      return new Promise((resolve) => {
        resolve({ message: 'Default Resolver' })
      })
  }
})


const start = async () => {
  console.log('%cBackground script started...', 'color:orange')

}

start()