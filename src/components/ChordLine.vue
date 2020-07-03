<template>
  <div>
    <div v-for="index in wordCount" :key="index" class="sameLine">
      <ChordBox
        @chordEntered="captureChord($event, index - 1)"
        @disableTranspose="andDisable($event, index - 1)"
        :transposeN="transposeN"
        :style="'padding-right:' + spaces[index - 1] + 'ch;'"
      />
    </div>
  </div>
</template>

<script>
import ChordBox from "@/components/ChordBox.vue";
export default {
  name: "ChordLine",

  data: () => ({
    wordCount: 1,
    chords: null, // will need to capture this from ChordBox,
    badChords: null,
    badChordLine: false
  }),
  props: {
    lyric: String,
    spaces: Array,
    line: Number,
    transposeN: Number
  },
  methods: {
    countWords() {
      this.wordCount = this.lyric.split(" ").length;
      if (this.wordCount < 1) {
        this.wordCount = 1;
      }
    },
    captureChord(val, index) {
      this.chords.splice(index, 1, val);
      this.compareLyricsAndChords(index);
      this.$emit("chordsEntered", this.chords);
    },
    compareLyricsAndChords(index) {
      let l = this.lyric.split(" ");
      let c = this.chords;
      if (typeof c[index] === "undefined") {
        c.splice(index, 1, "1");
      }
      if (l[index].length > c[index].length) {
        this.spaces.splice(index, 1, l[index].length - c[index].length + 1);
      } else {
        this.spaces.splice(index, 1, 1);
      }
    },
    andDisable(disable, index) {
      this.badChords.splice(index, 1, disable);
      this.badChordLine = this.badChords.some((badChord) => badChord == true);
      this.$emit("disableTranspose", this.badChordLine);
    }
  },
  mounted() {
    this.countWords();
    this.chords = Array(this.wordCount);
    this.chords.fill("x");
    this.badChords = Array(this.wordCount);
    this.badChords.fill(false);
  },
  components: {
    ChordBox
  },
  watch: {
    lyric: function() {
      this.countWords();
      for (let i = 0; i < this.wordCount; i++) {
        this.compareLyricsAndChords(i);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sameLine {
  float: left;
}
</style>
