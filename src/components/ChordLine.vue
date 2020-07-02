<template>
  <div>
    <div v-for="index in wordCount" :key="index" class="sameLine">
      <ChordBox
        @chordEntered="captureChord($event, index - 1)"
        :transposeN="transposeN"
        :style="'padding-right:' + spaces[index - 1].toString() + 'ch;'"
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
      console.log(l);
      console.log(c);
      if (typeof c[index] === "undefined") {
        c.splice(index, 1, "1");
      }
      if (l[index].length > c[index].length) {
        this.spaces.splice(index, 1, l[index].length - c[index].length + 1);
      } else {
        this.spaces.splice(index, 1, 1);
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
