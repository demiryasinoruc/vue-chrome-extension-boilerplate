<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import browser from 'webextension-polyfill'

export default {
  data() {
    return {
      msg: 'Example List Page!'
    }
  }
}
</script>

<style></style>
