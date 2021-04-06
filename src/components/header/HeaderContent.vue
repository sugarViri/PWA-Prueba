<template lang="pug">
  header(class="customized-main-header")
    div(class="main-header")
      el-row(
        type="flex"
        align="middle"
        class="main-header-content")
        el-col(
          :span="12"
          align="left")
          router-link(to="/profiles") Perfiles

</template>

<script>

export default {
  name: 'HeaderContent'
}
</script>

<style lang="scss" scoped>
.customized-main-header {
  display: block;
  .main-header {
    position: relative;
    height: 64px;
    background: #fff;
    box-shadow: 0 2px 10px 0 #3a444b;
    z-index: 1001;
    .main-header-content {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: space-between;
      padding: 16px;
      box-sizing: border-box;
    }
  }
}

</style>
