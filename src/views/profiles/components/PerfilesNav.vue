<template>
  <div class="nav">
    <div class="nav-content" >
      <div  v-for="tab in tabs" :key="tab.id">
        <button @click="changeTab(tab['id'])">
          <p >{{ tab.name }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerfilesNav',
  data () {
    return {
      activeName: 'profiles',
      activeTab: 1,
      tabs: [
        {
          id: 1,
          name: 'Perfiles'
        },
        {
          id: 2,
          name: 'Favoritos'
        }
      ]
    }
  },
  methods: {
    changeTab (index) {
      if (index === 1) {
        this.activeTab = 1
        this.activeName = 'profiles'
      } else {
        this.activeTab = 2
        this.activeName = 'profilesFavorite'
      }
      this.$emit('active-tab', this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>

.nav {
  margin: -24px -24px 10px -24px;
  min-height: 50px;
  position: relative;
  z-index: 1002;
  box-shadow: 0 0px 7px 0 #060E14;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  border-left: 1px solid #f0f0f0;
  overflow: auto;
  box-sizing: border-box;
  padding: 16px;
}
.nav-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.nav-content button {
  display: inline;
  width: 200px;
  padding: 1rem 2rem;
  margin: 0 1rem;
  color: #303030;
  font-weight: bold;
  font-size: 1rem;
  background-color: #fff;

}
.nav-content button:hover {
  background-color: #bbbaba;
}
</style>
