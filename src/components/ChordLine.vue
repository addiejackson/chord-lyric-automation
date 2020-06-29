<template>
  <div>
    <div v-for="index in wordCount" :key="index" class="sameLine">
      <ChordBox
        @chordEntered="captureChord($event, index)"
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
    chords: null // will need to capture this from ChordBox
  }),
  props: {
    lyric: String,
    spaces: Array,
    line: Number
  },
  methods: {
    countWords() {
      this.wordCount = this.lyric.split(" ").length;
      if (this.wordCount < 1) {
        this.wordCount = 1;
      }
    },
    captureChord(val, index) {
      this.chords.splice(index - 1, 1, val);
      this.compareLyricsAndChords(index);
      this.$emit("chordsEntered", this.chords);
    },
    compareLyricsAndChords(index) {
      let l = this.lyric.split(" ");
      let c = this.chords;
      if (typeof c[index] === "undefined") {
        c[index] = "1";
      }
      if (l[index].length > c[index].length) {
        this.spaces[index] =
          this.spaces[index] - (l[index].length - c[index].length);
      } else {
        this.spaces[index] = 1;
      }
    }
  },
  mounted() {
    this.countWords();
    this.chords = Array(this.wordCount);
    this.chords.fill("");
  },
  components: {
    ChordBox
  },
  watch: {
    lyric: function() {
      this.countWords();
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
