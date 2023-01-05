<template>
  <GMapMap
    :center="markersCenter"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 100%"
    :style="'height:' + mapHeight"
    @click="openMarker(null)"
  >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.address.position"
      :clickable="true"
      :icon="{
        url: './icons/rectangle.svg',
        scaledSize: { width: 60, height: 42 },
        fillColor: '#fff',
      }"
      :label="{
        color: 'white',
        fontWeight: 'bold',
        fontSize: '10px',
        text: m.rent.toString() + ' $',
      }"
      @click="clickMarker(m.id, m.address.position)"
    >
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID === m.id"
      >
        <MapInfoWindow :home="m" />
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import type { PropType } from "vue";
import { MapInfoWindow } from "@/components";
import type { Home, HomePosition } from "@/modules";

export default defineComponent({
  name: "App",
  data() {
    return {
      center: { lat: 50, lng: 50 },
      openedMarkerID: ref<number | null>(null),
    };
  },
  components: {
    MapInfoWindow,
  },
  props: {
    mapHeight: String,
    homeMarkers: Object as PropType<Array<Home>>,
  },
  computed: {
    markers(): Home[] | undefined {
      return this.homeMarkers;
    },
    markersCenter(): { lat: number; lng: number } {
      if (this.homeMarkers && this.homeMarkers.length > 0)
        return this.homeMarkers[0].address.position;
      else return this.center;
    },
    zoom(): number {
      if (this.homeMarkers && this.homeMarkers.length > 0) return 12;
      else return 2;
    },
  },
  methods: {
    openMarker(id: number | null) {
      this.openedMarkerID = id;
    },
    clickMarker(id: number | null, position: HomePosition) {
      this.center = position;
      this.openedMarkerID = id;
    },
  },
});
</script>

<style>
.gm-style .gm-style-iw-c {
  padding: 0px;
}
</style>
