<template>
  <div>
    <span class="lyric-container" v-for="(word, index) in words" :key="index">
      <span
        class="word"
        :style="'padding-right:' + wordSpaces[index] + 'ch;'"
        >{{ word }}</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "LyricLine",
  props: ["words", "wordSpaces"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 16px;
}
</style>
