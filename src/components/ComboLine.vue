<template>
  <v-container class="pa-0 my-0">
    <v-row>
      <v-col class="py-0 mt-0">
        <ChordLine
          :exporting="exporting"
          :chordSpaces="chordSpaces"
          :arrowChords="chords"
          :transposeN="transposeN"
          @chordsEntered="captureChords($event)"
          @disableTranspose="disable($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 my-2">
        <LyricLine
          :words="words"
          :wordSpaces="wordSpaces"
          style="padding-top:0px;"
          v-if="!onlyChords"
        />
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
    currentLyric: ""
  }),
  props: {
    lyric: String,
    transposeN: Number,
    exporting: Boolean
  },
  methods: {
    captureChords(chordInfo) {
      this.chords = chordInfo;
    },
    disable(disable) {
      this.$emit("disableTranspose", disable);
    },
    updateCWMap(mounted = false) {
      let words = this.dismantleLyric(this.lyric);
      let updatedCWMap = [];

      // If we know the incoming lyric doesn't end with
      // the present lyric, we replace the whole lyric
      // and associated chords originating from
      // chordboxes.
      if (!this.lyric.endsWith(this.currentLyric) || mounted) {
        words.forEach((word, idx) => {
          if (idx < this.cwMap.length) {
            updatedCWMap.splice(idx, 1, {
              word: word,
              chord: ""
            });
          } else {
            updatedCWMap.push({
              word: word,
              chord: ""
            });
          }
        });
      }

      // If we can confirm that the new lyric ends with
      // the lyric it is replacing, we can push the
      // old lyric and prepend the new words of the new
      // lyric.
      if (this.lyric.endsWith(this.currentLyric) && !mounted) {
        let oldWords = this.dismantleLyric(this.currentLyric);
        let foundStart = false;
        for (const [idx, word] of words.entries()) {
          if (word == oldWords[0] && !foundStart) {
            foundStart = true;
          }
          if (!foundStart) {
            updatedCWMap.splice(idx, 0, {
              word: word,
              chord: ""
            });
          } else {
            updatedCWMap.push(...this.cwMap);
            break;
          }
        }
      }

      // This scrapes through the words and updates any
      // word starting with ">" to be blank. It then
      // takes the substringed chord and places it in the
      // CL Map.
      words.forEach((word, idx) => {
        if (word[0] == ">") {
          updatedCWMap.splice(idx, 1, {
            word: "",
            chord: word.substring(1)
          });
        }
      });

      this.cwMap = updatedCWMap;
      this.currentLyric = this.lyric;
    },
    getChordSpaces(cls) {
      if (cls.chord.length == 0) {
        return Math.abs(cls.word.length - cls.chord.length);
      }
      if (cls.word.length > cls.chord.length) {
        return Math.abs(cls.word.length - cls.chord.length) + 1;
      }
      return 1;
    },
    getWordSpaces(cls) {
      if (cls.chord.length > cls.word.length) {
        return Math.abs(cls.word.length - cls.chord.length) + 1;
      }
      return 1;
    },
    getFromCL(name) {
      let cw = [];
      this.cwMap.forEach((cl) => {
        cw.push(cl[name]);
      });
      return cw;
    }
  },
  watch: {
    lyric: function() {
      this.updateCWMap();
    }
  },
  computed: {
    wordSpaces: function() {
      let wordSpaces = [];
      this.cwMap.forEach((cl) => {
        wordSpaces.push(this.getWordSpaces(cl));
      });
      return wordSpaces;
    },
    chordSpaces: function() {
      let chordSpaces = [];
      this.cwMap.forEach((cl) => {
        chordSpaces.push(this.getChordSpaces(cl));
      });
      return chordSpaces;
    },
    chords: {
      get: function() {
        return this.getFromCL("chord");
      },
      set: function(chordInfo) {
        this.cwMap[chordInfo.index].chord = chordInfo.chord;
      }
    },
    words: function() {
      return this.getFromCL("word");
    },
    onlyChords: function() {
      let words = this.getFromCL("word");
      if (words) {
        return words.every((val) => val == "");
      }
      return false;
    }
  },
  mounted() {
    this.updateCWMap(true);
    this.currentLyric = this.lyric;
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
