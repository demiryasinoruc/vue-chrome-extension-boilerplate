import browser from 'webextension-polyfill'

import { IS_DEV_MODE } from '../common/config'
import {} from '../common/keys'
import { delay } from '../common/utility'

const start = async () => {
  console.log('%cContent script started...', 'color:orange')
}

start()
