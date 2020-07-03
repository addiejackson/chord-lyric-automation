<template>
  <v-container class="py-0 mt-7" style="max-width:1050px;">
    <LyricInput
      @lyricsDone="captureLyrics"
      @titleEntered="captureTitle"
      @transposeChanged="captureTranspose"
      :disableTranspose="disableTranspose"
    ></LyricInput>
    <v-container>
      <v-row align="center" class="py-0 mt-5">
        <v-col>
          <h1>{{ title }}</h1>
        </v-col>
      </v-row>
      <v-row align="center" class="mt-0">
        <v-col>
          <div v-for="(lyric, idx) in lyrics" :key="idx">
            <ComboLine :lyric="lyric" :transposeN="transposeN" @disableTranspose="captureDisable"></ComboLine>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
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
    transposeN: 0,
    disableTranspose: false
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
    },
    captureDisable(disable) {
      this.disableTranspose = disable;
    }
  },
  components: {
    ComboLine,
    LyricInput
  },
  mounted() {
    document.title = "GetChords";
  }
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
