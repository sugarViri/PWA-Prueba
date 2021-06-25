<template>
  <div v-if="profile" class="perfilDetalle">
    <el-row
      :gutter="20"
      class="encabezado">
      <el-col :span="24">
        <h4> {{ $t( 'application.detailProfile' ) }} </h4>
      </el-col>
    </el-row>
    <hr class="subtitle-underlined-separator" />

    <el-row
      :gutter="20"
      class="triple-spaced-row">
      <el-col
        :span="6"
        align="left"
        class="label-default">
        <img
          width="150"
          :src="profile.picture.large" />
      </el-col>
      <el-col
        :span="12"
        class="label-default">
        <the-map
          :latitude="profile.location.coordinates.latitude"
          :longitude="profile.location.coordinates.longitude"
         />
      </el-col>

      <el-col
        :span="6"
        class="label-default">
        <el-button
          v-if="!isFavorite"
          key="is-favorite"
          type="primary"
          @click="addProfilesFavorites"
          > {{ $t( 'application.buttons.addFavorites' ) }}
        </el-button>
        <el-button
          v-else
          key="is-favorite"
          type="success"
          @click="deleteProfilesFavorites"> {{ $t( 'application.buttons.deleteFavorite' ) }}
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        align="left">
        <h5> {{ $t( 'application.personalInformation' ) }} </h5>
      </el-col>
    </el-row>
    <hr class="subtitle-underlined-separator" />

    <el-row
      type="flex"
      :gutter="20"
      align="middle"
      class="contenedorLabel">
      <div class="nombreEmail">
        <el-col
          :span="12"
          align="left"
          class="value-default"> {{ profile.name.first + ' ' + profile.name.last }}
        </el-col>
        <el-col
          :span="12"
          align="left"
          class="value-default"> {{ profile.email || '&shy;' }}
        </el-col>
      </div>
    </el-row>

    <el-row :gutter="20">
      <el-col
        :span="6"
        align="left">
        <h5> {{ $t( 'application.location' ) }} </h5>
      </el-col>
    </el-row>
    <hr class="subtitle-underlined-separator" />
    <el-row
      :gutter="20"
      class="contenedorLabel">
      <div class="ciudadLocalizacion">
      <el-col
        :span="6"
        align="left"
        class="value-default"> Cuidad: {{ profile.location.city }}
      </el-col>
      <el-col
        :span="6"
        align="left"
        class="value-default">Dir.: {{ `${profile.location.street.name}, ${profile.location.street.number}` }}
      </el-col>
      <el-col
        :span="6"
        align="left"
        class="value-default">Tel.: {{ profile.phone }}
      </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>

import TheMap from '@/components/share/TheMap'

export default {
  name: 'profileDetail',
  components: {
    TheMap
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
.perfilDetalle {
.encabezado {
  height: 50px;
  h4 {
    color: #ffffff;
    font-size: 1.5rem;;
  }
}
h5 {
  color: hsl(0, 5%, 80%);
}
.el-button--primary {
  background-color: #b3e19d;
  color: #303030;
  padding: 0.5rem 0.5rem;
  width: 56px;
}
.el-button--success {
  background-color: hsl(41, 57%, 71%);
  border-color: hsl(41, 57%, 71%);
  color: #303030;
  padding: 0.5rem 0.5rem;
  width: 56px;
}
.contenedorLabel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem 0 1.5rem 0;
  .nombreEmail {
    >div {
      width: 270px;
    }
    .value-default {
    padding: 0.2rem 0;
    }
  }
  .ciudadLocalizacion {
    >div {
      width: 240px;
    }
    .value-default {
    padding: 0.2rem 0;
    }
  }
}
.value-default {
  color: rgb(250, 245, 245);
}
}

</style>
