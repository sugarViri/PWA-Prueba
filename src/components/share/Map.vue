<template lang="pug">

  div(class="map")
    l-map(
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate")

      l-tile-layer(:url="url")

      l-marker(:lat-lng="withTooltip")
        l-tooltip(:options="{ permanent: true, interactive: true }")
          span {{ $t('application.fields.direction') }}

</template>

<script>
import { latLng } from 'leaflet'
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip
} from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  props: {
    latitude: {
      type: String,
      default: '38.425800'
    },
    longitude: {
      type: String,
      default: '-6.416450'
    }
  },
  data () {
    return {
      zoom: 13,
      center: latLng(this.latitude, this.longitude),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      withPopup: latLng(this.latitude, this.longitude),
      withTooltip: latLng(this.latitude, this.longitude),
      currentZoom: 11.5,
      currentCenter: latLng(this.latitude, this.longitude),
      mapOptions: {
        zoomSnap: 0.5
      }
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 240px;
  width: 100%;
}
</style>
