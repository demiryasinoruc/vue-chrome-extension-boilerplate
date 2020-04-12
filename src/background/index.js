import browser from 'webextension-polyfill'


// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

// OnMessage handler
browser.runtime.onMessage.addListener((request) => {
  const { action } = request
  switch (action) {
    default:
      return new Promise((resolve) => {
        resolve({ message: 'Default Resolver' })
      })
  }
})