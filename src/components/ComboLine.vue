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
  // import { EventBus } from "./EventBus.js";

  export default {
    name: "ComboLine",
    mixins: [DismantleLyric],
    data: () => ({
      cwMap: [],
      clearAll: 0,
    }),
    props: {
      lyric: String,
      index: Number,
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

        // // If we know the incoming lyric doesn't end with
        // // the present lyric, we replace the whole lyric
        // // and associated chords originating from
        // // chordboxes.
        // if (!this.lyric.endsWith(this.currentLyric) || mounted) {
        //   words.forEach((word, idx) => {
        //     if (idx < this.cwMap.length) {
        //       updatedCWMap.splice(idx, 1, {
        //         word: word,
        //         chord: "",
        //       });
        //     } else {
        //       updatedCWMap.push({
        //         word: word,
        //         chord: "",
        //       });
        //     }
        //   });
        // }

        // // If we can confirm that the new lyric ends with
        // // the lyric it is replacing, we can push the
        // // old lyric and prepend the new words of the new
        // // lyric.
        // if (this.lyric.endsWith(this.currentLyric) && !mounted) {
        //   let oldWords = this.dismantleLyric(this.currentLyric);
        //   let foundStart = false;
        //   for (const [idx, word] of words.entries()) {
        //     if (word == oldWords[0] && !foundStart) {
        //       foundStart = true;
        //     }
        //     if (!foundStart) {
        //       updatedCWMap.splice(idx, 0, {
        //         word: word,
        //         chord: "",
        //       });
        //     } else {
        //       updatedCWMap.push(...this.cwMap);
        //       break;
        //     }
        //   }
        // }

        // // This scrapes through the words and updates any
        // // word starting with ">" to be blank. It then
        // // takes the substringed chord and places it in the
        // // CL Map.
        // words.forEach((word, idx) => {
        //   if (word[0] == ">") {
        //     updatedCWMap.splice(idx, 1, {
        //       word: "",
        //       chord: word.substring(1),
        //     });
        //   }
        // });

        // this.cwMap = updatedCWMap;
        // this.currentLyric = this.lyric;
      },
      computeChordSpaces(chord, index) {
        if (chord.length == 0) {
          return Math.abs(this.lyrics[index].length);
        }
        if (this.lyrics[index].length > chord.length) {
          return Math.abs(this.lyrics[index].length - chord.length) + 1;
        }
        return 1;
      },
      computeWordSpaces(word, index) {
        if (word.length == 0) {
          return Math.abs(this.chords[index].length) + 1;
        }
        if (word.length > this.chords[index].length) {
          return Math.abs(this.chords[index].length - word.length) + 1;
        }
        return 1;
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
          return this.$store.state.chordLyricMap[this.index].chords;
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
      chordSpaces: {
        get() {
          return this.$store.state.chordLyricMap[this.index].chordSpaces;
        },
      },
      lyrics: {
        get() {
          return this.$store.state.chordLyricMap[this.index].lyrics;
        },
        set(lyricInfo) {
          let payload = {
            lineIndex: this.index,
            word: lyricInfo.word,
            wordIndex: lyricInfo.index,
          };
          this.$store.commit("updateLyrics", payload);

          // let spaces = this.computeWordSpaces(lyricInfo.word, lyricInfo.index);
          // this.lyricSpaces = {
          //   spaces: spaces,
          //   wordIndex: lyricInfo.index,
          // };
        },
      },
      lyricSpaces: {
        get() {
          return this.$store.state.chordLyricMap[this.index].lyricSpaces;
        },
        // set(info) {
        //   let payload = {
        //     lineIndex: this.index,
        //     spaces: info.spaces,
        //     wordIndex: info.wordIndex,
        //   };
        //   this.$store.commit("updateLyricSpaces", payload);
        // },
      },
      onlyChords: function() {
        if (this.lyrics) {
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
