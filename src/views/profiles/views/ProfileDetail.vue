<template lang="pug">
  div(v-if="profile")
    el-row(
      :gutter="20"
      class="triple-spaced-row")
      el-col(:span="24")
        h5 {{ $t( 'application.detailProfile' ) }}

    el-row(:gutter="20")
      el-col(
        :span="6"
        align="left")
        h5 {{ $t( 'application.generalInformation' ) }}

    hr(class="subtitle-underlined-separator")

    el-row(
      :gutter="20"
      class="triple-spaced-row")
      el-col(
        :span="6"
        align="left"
        class="label-default")
        img(
          width="150"
          :src="profile.picture.large")
      el-col(
        :span="12"
        class="label-default")
        Map(
          :latitude="profile.location.coordinates.latitude"
          :longitude="profile.location.coordinates.longitude")

      el-col(
        :span="6"
        class="label-default")
        el-button(
          v-if="!isFavorite"
          key="is-favorite"
          type="primary"
          @click="addProfilesFavorites") {{ $t( 'application.buttons.addFavorites' ) }}
        el-button(
          v-else
          key="is-favorite"
          type="success"
          @click="deleteProfilesFavorites") {{ $t( 'application.buttons.deleteFavorite' ) }}

    el-row(:gutter="20")
      el-col(
        :span="6"
        align="left")
        h5 {{ $t( 'application.personalInformation' ) }}

    hr(class="subtitle-underlined-separator")

    el-row(
      :gutter="20"
      class="spaced-row")
      el-col(
        :span="6"
        align="left"
        class="label-default") {{ $t( 'application.fields.name' ) }}
      el-col(
        :span="6"
        align="left"
        class="label-default") {{ $t( 'application.fields.email' ) }}

    el-row(
      :gutter="20"
      class="triple-spaced-row")
      el-col(
        :span="6"
        align="left"
        class="value-default") {{ `${profile.location.street.name}, ${profile.location.street.number}` }}
      el-col(
        :span="6"
        align="left"
        class="value-default") {{ profile.email || '&shy;' }}

    el-row(:gutter="20")
      el-col(
        :span="6"
        align="left")
        h5 {{ $t( 'application.location' ) }}

    hr(class="subtitle-underlined-separator")

    el-row(
      :gutter="20"
      class="spaced-row")
      el-col(
        :span="6"
        align="left"
        class="label-default") {{ $t( 'application.fields.city' ) }}
      el-col(
        :span="6"
        align="left"
        class="label-default") {{ $t( 'application.fields.street' ) }}
      el-col(
        :span="6"
        align="left"
        class="label-default") {{ $t( 'application.fields.phoneNumber' ) }}

    el-row(
      :gutter="20"
      class="double-spaced-row")
      el-col(
        :span="6"
        align="left"
        class="value-default") {{ profile.location.city }}
      el-col(
        :span="6"
        align="left"
        class="value-default") {{ `${profile.location.street.name}, ${profile.location.street.number}` }}
      el-col(
        :span="6"
        align="left"
        class="value-default") {{ profile.phone }}

</template>

<script>

import Map from '@/components/share/Map'

export default {
  name: 'profileDetail',
  components: {
    Map
  },
  props: {
    profileId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      listOfProfilesFavorites: JSON.parse(localStorage.getItem('listOfProfilesFavorites')) || [],
      hasLoadedPage: false
    }
  },
  computed: {
    isFavorite () {
      return !!this.listOfProfilesFavorites.find(item => item.id.value.toString() === this.profile.id.value.toString())
    }
  },
  methods: {
    addProfilesFavorites () {
      this.listOfProfilesFavorites.push(this.profile)
      this.saveListProfilesFavorites()
    },
    deleteProfilesFavorites () {
      this.listOfProfilesFavorites = [...this.listOfProfilesFavorites.filter(item => item.id.value.toString() !== this.profileId.toString())]
      this.saveListProfilesFavorites()
    },
    saveListProfilesFavorites () {
      localStorage.setItem('listOfProfilesFavorites', JSON.stringify(this.listOfProfilesFavorites))
    },
    async fetchInitialData () {
      const listOfProfiles = JSON.parse(localStorage.getItem('listOfProfiles')) || []
      this.profile = listOfProfiles.find(item => item.id.value.toString() === this.profileId.toString())
      if (this.profile) {
        this.hasLoadedPage = true
      } else {
        this.$router.push({ name: 'profiles' })
      }
    }
  },
  created () {
    this.fetchInitialData()
  }
}
</script>

<style lang="scss" scoped>
.color-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #000;
}
.color-circle:hover {
  width: 55px;
  height: 55px;
}
.logos {
  display: inline-block;
}
</style>
