<template>
  <div class="home">
    <LyricInput
      @lyricsDone="captureLyrics"
      @titleEntered="captureTitle"
      @transposeChanged="captureTranspose"
    ></LyricInput>
    <br />
    <br />
    <div>
      <h1>{{title}}</h1>
    </div>
    <br />
    <br />
    <br />
    <ComboLine :lyrics="lyrics" :transposeN="transposeN" style="margin-left:20%"></ComboLine>
  </div>
</template>

<script>
// @ is an alias to /src
import ComboLine from "@/components/ComboLine.vue";
import LyricInput from "@/components/LyricInput.vue";

export default {
  name: "Home",
  data: () => ({
    lyrics: null,
    title: "",
    transposeN: 0
  }),
  methods: {
    captureLyrics(lyrics) {
      this.lyrics = lyrics;
    },
    captureTitle(value) {
      this.title = value;
    },
    captureTranspose(transposeN) {
      this.transposeN = transposeN;
    }
  },
  components: {
    ComboLine,
    LyricInput
  }
};
</script>

<style>
h1 {
  float: left;
  margin-left: 20%;
  text-align: left;
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
}
</style>
