<template lang="pug">
  div(id="app")
    header-content(id="header")
    div(class="flex-container")
      div(class="main")
        div(class="main-container")
          router-view

</template>

<script>

import HeaderContent from '@/components/header/HeaderContent'

export default {
  name: '',
  components: {
    HeaderContent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header {
  height: $--header-height;
}
.flex-container {
  display: flex;
}
.main {
  height: calc(100vh - #{sum($--header-height)});
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  padding-top: 0;

  overflow: auto;
  .main-container {
    margin: 24px;
    // padding: 24px;
  }
}
.main::-webkit-scrollbar {
  display: none;
}
</style>
