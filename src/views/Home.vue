<template>
  <v-container class="py-0 mt-7" style="max-width:60%;">
    <Controller
      @lyricsDone="captureLyrics"
      @titleEntered="captureTitle"
      @copyText="copyText"
    ></Controller>
    <v-container ref="output">
      <v-row align="center" class="py-0 mt-7">
        <v-col>
          <h1>{{ title }}</h1>
        </v-col>
      </v-row>
      <v-row align="center" class="mt-0">
        <v-col>
          <div v-for="(lyric, idx) in lyrics" :key="idx">
            <ComboLine :lyric="lyric" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ComboLine from "@/components/ComboLine.vue";
import Controller from "@/components/Controller.vue";
import { CopyChordsAndLyrics } from "@/mixins/CopyChordsAndLyrics.js";
// import html2canvas from "html2canvas";

export default {
  name: "Home",
  mixins: [CopyChordsAndLyrics],
  data: () => ({
    lyrics: null,
    title: "",
    output: null,
  }),
  methods: {
    captureLyrics(lyrics) {
      this.lyrics = lyrics;
    },
    captureTitle(value) {
      this.title = value;
    },
    copyText() {
      let spans = this.$refs.output.querySelectorAll(
        "span:not(.lyric-container)"
      );
      // from CopyChordsAndLyrics mixin
      this.copyChordsAndLyrics(spans);
    },
  },
  components: {
    ComboLine,
    Controller,
  },
  mounted() {
    document.title = "Bowstring";
  },
};
</script>

<style>
h1 {
  float: left;
  text-align: left;
  font-family: "Courier New", Courier, monospace;
  font-size: 24px;
}
</style>
