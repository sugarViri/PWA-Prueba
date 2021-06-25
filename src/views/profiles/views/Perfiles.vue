<template>
  <div>
    <perfiles-nav @active-tab="changeActiveTab" />

    <perfiles-lista-general v-if="activeName === 'profiles'" />

    <perfiles-lista-favoritos v-if="activeName === 'profilesFavorite'" />

<!--     <profiles-favorites-list v-if="activeName === 'profilesFavorite'" /> -->
  </div>
</template>

<script>

import PerfilesNav from '@/views/profiles/components/PerfilesNav'
import PerfilesListaGeneral from '@/views/profiles/components/PerfilesListaGeneral'
import PerfilesListaFavoritos from '@/views/profiles/components/PerfilesListaFavoritos'

export default {
  name: 'Profiles',
  components: {
    PerfilesNav,
    PerfilesListaFavoritos,
    PerfilesListaGeneral
  },
  data () {
    return {
      activeName: 'profiles'
    }
  },
  methods: {
    changeActiveTab (tab) {
      this.activeName = tab
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
