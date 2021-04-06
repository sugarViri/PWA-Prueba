<template lang="pug">

  div(class="sub-header")
    el-tabs(
      v-model="activeName"
      @tab-click="handleClick")
      el-tab-pane(
        :label="$t('menu.profiles')"
        name="profiles")
      el-tab-pane(
        :label="$t('menu.profilesFavorite')"
        name="profilesFavorite")

</template>

<script>
export default {
  name: 'ProfileHeader',
  data () {
    return {
      activeName: 'profiles'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$emit('active-tab', this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>

.sub-header {
  margin: -24px -24px 24px;
  min-height: 60px;
  position: relative;
  z-index: 1002;
  box-shadow: 0 0px 7px 0 #060E14;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  border-left: 1px solid #f0f0f0;
  overflow: auto;
  box-sizing: border-box;
  padding: 16px;
  margin-bottom: 24px;
}
</style>
