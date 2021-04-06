<template lang="pug">
  div
    profile-header(@active-tab="changeActiveTab")

    profiles-list(v-if="activeName === 'profiles'")
    profiles-favorites-list(v-if="activeName === 'profilesFavorite'")

</template>

<script>

import ProfileHeader from '@/views/profiles/components/ProfileHeader'
import ProfilesList from '@/views/profiles/components/ProfilesList'
import ProfilesFavoritesList from '@/views/profiles/components/ProfilesFavoritesList'

export default {
  name: 'Profiles',
  components: {
    ProfileHeader,
    ProfilesList,
    ProfilesFavoritesList
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
