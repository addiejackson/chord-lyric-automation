<template>
  <div class="hello">
    <div v-for="(lyric, idx) in lyrics" :key="idx">
      <ChordLine :lyric="lyric" />
      <br />
      <br />
      <br />
      <br />
      <LyricLine :lyric="lyric" style="padding-top:0px;" />
    </div>
  </div>
</template>

<script>
import ChordLine from "@/components/ChordLine.vue";
import LyricLine from "@/components/LyricLine.vue";
export default {
  name: "ComboLine",
  props: {
    lyrics: Array
  },
  components: {
    ChordLine,
    LyricLine
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  font-family: "Courier New", Courier, monospace;
  text-align: left;
  line-height: 11px;
  font-size: 16px;
}
</style>
