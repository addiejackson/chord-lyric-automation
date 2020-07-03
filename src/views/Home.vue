<template>
  <v-container class="py-0 mt-7" style="max-width:1050px;">
    <LyricInput
      @lyricsDone="captureLyrics"
      @titleEntered="captureTitle"
      @transposeChanged="captureTranspose"
      :disableTranspose="disableTranspose"
    ></LyricInput>
    <v-btn @click="exportPDF">Export</v-btn>
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
import LyricInput from "@/components/LyricInput.vue";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

export default {
  name: "Home",
  data: () => ({
    lyrics: null,
    title: "",
    transposeN: 0,
    disableTranspose: false,
    output: null
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
    async exportPDF() {
      const el = this.$refs.output;
      let doc = new jsPDF();
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output = await this.$html2canvas(el, options);
      doc.addImage(this.output, "JPEG", 0, 0);
      doc.save("sample.pdf");
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
