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
      :position="m.position"
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
        text: m.price.toString() + ' $',
      }"
      @click="clickMarker(m.id, m.position)"
    >
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID === m.id"
      >
        <MapInfoWindow :img="m.cover" />
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import { MapInfoWindow } from "./index";

interface Position {
  lat: number;
  lng: number;
}
export interface Marker {
  id: number;
  cover?: string;
  position: Position;
  price: number;
}

export default {
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
    homeMarkers: Object as PropType<Array<Marker>>,
  },
  computed: {
    markers() {
      return this.homeMarkers;
    },
    markersCenter() {
      if (this.homeMarkers && this.homeMarkers.length > 0)
        return this.homeMarkers[0].position;
      else return this.center;
    },
    zoom() {
      if (this.homeMarkers && this.homeMarkers.length > 0) return 12;
      else return 2;
    },
  },
  methods: {
    openMarker(id: number | null) {
      this.openedMarkerID = id;
    },
    clickMarker(id: number | null, position: Position) {
      this.center = position;
      this.openedMarkerID = id;
    },
  },
};
</script>

<style>
.gm-style .gm-style-iw-c {
  padding: 0px;
}
</style>
