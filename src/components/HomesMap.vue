<template>
  <GMapMap
    :center="{ lat: 51.093048, lng: 6.84212 }"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 900px"
  >
  </GMapMap>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
    };
  },
};
</script>
