<template>
  <div id="app">
    <the-header id="header"></the-header>
    <div class="flex-container">
      <div class="principal">
        <div class="contenedorRuta">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TheHeader from '@/components/header/TheHeader'

export default {
  name: '',
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
/*   color: #2c3e50; */
}
#header {
  height: $--header-height;
}
.flex-container {
  display: flex;
}
.principal {
  height: calc(100vh - #{sum($--header-height)});
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  overflow: auto;
}
.contenedorRuta {
    margin: 24px;
    // padding: 24px;
}
.principal::-webkit-scrollbar {
  display: none;
}
</style>
