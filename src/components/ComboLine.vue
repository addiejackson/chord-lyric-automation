<template>
  <v-container class="pa-0 my-0">
    <v-row>
      <v-col class="py-0 mt-0">
        <ChordLine :clearAll="clearAll" :index="index" @chordsEntered="captureChords($event)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 my-2">
        <LyricLine :index="index" style="padding-top:0px;" v-if="!onlyChords" />
      </v-col>
    </v-row>
    <!-- To accommodate copy/paste method -->
    <span v-if="onlyChords" class="onlyChords"></span>
  </v-container>
</template>

<script>
  import ChordLine from "@/components/ChordLine.vue";
  import LyricLine from "@/components/LyricLine.vue";
  import { DismantleLyric } from "@/mixins/DismantleLyric.js";

  export default {
    name: "ComboLine",
    mixins: [DismantleLyric],
    data: () => ({
      cwMap: [],
      clearAll: 0,
    }),
    props: {
      index: Number,
      lyric: String,
    },
    methods: {
      captureChords(chordInfo) {
        this.chords = chordInfo;
      },
      handleSoloChords(words) {
        words.forEach((word, idx) => {
          if (word.startsWith(">")) {
            this.chords = { chord: word.substring(1), index: idx };
            this.lyrics = { word: "", index: idx };
          }
        });
      },
      updateCLMap() {
        let words = this.dismantleLyric(this.lyric);

        let defaultChordLyricMap = {
          chords: new Array(words.length).fill(""),
          chordSpaces: new Array(words.length).fill(1),
          lyrics: words,
          lyricSpaces: new Array(words.length).fill(1),
        };

        words.forEach((word, i) => {
          defaultChordLyricMap.chordSpaces[i] = word.length;
        });

        this.chordLyricMap = defaultChordLyricMap;

        this.handleSoloChords(words);
      },
    },
    watch: {
      lyric: function() {
        this.updateCLMap();
      },
    },
    computed: {
      chordLyricMap: {
        get() {
          if (
            typeof this.$store.state.chordLyricMap[this.index] === "undefined"
          ) {
            this.updateCLMap();
          }
          return this.$store.state.chordLyricMap[this.index];
        },
        set(cCsWWs) {
          this.$store.commit("updateChordLyricMap", {
            structure: cCsWWs,
            index: this.index,
          });
        },
      },
      chords: {
        get() {
          return this.chordLyricMap.chords;
        },
        set(chordInfo) {
          let payload = {
            lineIndex: this.index,
            chord: chordInfo.chord,
            chordIndex: chordInfo.index,
          };
          this.$store.commit("updateChords", payload);
        },
      },
      lyrics: {
        get() {
          return this.chordLyricMap.lyrics;
        },
        set(lyricInfo) {
          let payload = {
            lineIndex: this.index,
            word: lyricInfo.word,
            wordIndex: lyricInfo.index,
          };
          this.$store.commit("updateLyrics", payload);
        },
      },
      onlyChords: function() {
        if (this.chordLyricMap && this.lyrics) {
          return this.lyrics.every(val => val == "");
        }
        return false;
      },
    },
    mounted() {
      this.updateCLMap();
    },
    components: {
      ChordLine,
      LyricLine,
    },
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
