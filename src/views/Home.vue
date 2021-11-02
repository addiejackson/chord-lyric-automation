<template>
  <v-container class="py-0 mt-7" style="max-width:60%;">
    <Controller @copyText="copyText"></Controller>
    <v-container ref="output">
      <v-row align="center" class="py-0 mt-7">
        <v-col>
          <h1>{{ title }}</h1>
        </v-col>
      </v-row>
      <v-row align="center" class="mt-0">
        <v-col>
          <div v-for="(lyric, idx) in lyricArray" :key="idx">
            <ComboLine :lyric="lyric" :index="idx" />
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
    computed: {
      lyricArray() {
        return this.$store.state.lyricArray;
      },
      title() {
        return this.$store.state.title;
      },
    },
    methods: {
      copyText() {
        let spans = this.$refs.output.querySelectorAll(
          "span:not(.lyric-container)",
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
