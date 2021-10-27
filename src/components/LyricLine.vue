<template>
  <div>
    <span class="lyric-container" v-for="(word, i) in lyrics" :key="i">
      <span class="word" :style="'padding-right:' + lyricSpaces[i] + 'ch;'">{{ word }}</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: "LyricLine",
    computed: {
      lyrics() {
        console.log("updated lyrics");
        return this.$store.state.chordLyricMap[this.index].lyrics;
      },
      lyricSpaces() {
        return this.$store.state.chordLyricMap[this.index].lyricSpaces;
      },
    },
    props: ["index"],
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    font-size: 16px;
  }
</style>
