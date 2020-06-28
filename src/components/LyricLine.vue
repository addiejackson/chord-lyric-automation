<template>
  <span>{{ lyric }}</span>
</template>

<script>
export default {
  name: "LyricLine",
  props: {
    lyric: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
