<script setup lang="ts">
import { computed } from "vue";

// const svg = iconToSVG(getIconData("mdi", "alarm"));
// // if an SVG icon have the `currentColor` value,
// // it's very likely to be a monochrome icon
// const mode = svg.includes("currentColor") ? "mask" : "background-img";

// const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
//   "base64"
// )}`;

// const uri = `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`;

// monochrome
// const svgStyle = computed(() => {
//   if (mode === "mask") {
//     return {
//       mask: `${uri} no-repeat`,
//       "mask-size": "100% 100%",
//       "background-color": "currentColor",
//       height: "1em",
//       width: "1em",
//     };
//   }
//   // colored
//   else {
//     return {
//       background: `${uri} no-repeat`,
//       "background-size": "100% 100%",
//       "background-color": "transparent",
//       height: "1em",
//       width: "1em",
//     };
//   }
// });
</script>

<template>
  <div class="my-icon"></div>
</template>

<style>
.my-icon {
  background-color: red;
  mask: url("./icons/checked-cross.svg");
  -webkit-mask: url("./icons/checked-cross.svg");
  background-size: 100% 100%;
  height: 1em;
  width: 1em;
}
</style>
