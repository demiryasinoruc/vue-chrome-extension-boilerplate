import browser from 'webextension-polyfill'

// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})
