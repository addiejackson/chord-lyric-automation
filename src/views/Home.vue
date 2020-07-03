<template>
  <v-container class="py-0 mt-7" style="max-width:1050px;">
    <Controller
      @lyricsDone="captureLyrics"
      @titleEntered="captureTitle"
      @transposeChanged="captureTranspose"
      :disableTranspose="disableTranspose"
    ></Controller>

    <!-- <img :src="output" /> -->
    <v-container ref="output">
      <v-row align="center" class="py-0 mt-7">
        <v-col>
          <h1>{{ title }}</h1></v-col
        >
      </v-row>
      <v-row align="center" class="mt-0">
        <v-col>
          <div v-for="(lyric, idx) in lyrics" :key="idx">
            <ComboLine
              :lyric="lyric"
              :transposeN="transposeN"
              @disableTranspose="captureDisable"
            />
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

// import html2canvas from "html2canvas";

export default {
  name: "Home",
  data: () => ({
    lyrics: null,
    title: "",
    transposeN: 0,
    disableTranspose: false,
    output: null,
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
    },
  },
  components: {
    ComboLine,
    Controller,
  },
  mounted() {
    document.title = "GetChords";
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
