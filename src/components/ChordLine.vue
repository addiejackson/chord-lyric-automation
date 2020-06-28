<template>
  <div>
    <div v-for="index in wordCount" :key="index" class="sameLine">
      <ChordBox
        @chordEntered="captureChord($event, index - 1)"
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
    content: "x",
    chordArray: null // will need to capture this from ChordBox
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
      this.chordArray[index] = val;
      this.compareLyricsAndChords();
      this.$emit("chordsEntered", this.chordArray);
    },
    compareLyricsAndChords(index) {
      let l = this.lyric.split(" ");
      let c = this.chordArray;
      if (l[index] > c[index]) {
        this.spaces[index] = this.spaces[index] - (l[index] - c[index]);
      } else {
        this.spaces[index] = 1;
      }
    }
  },
  mounted() {
    this.countWords();
    this.chordArray = Array(this.wordCount);
    this.spaces.forEach((space) => {
      for (let i = 0; i < space; i++) {
        this.content += "\xa0";
      }
      this.content += "x";
    });
    console.log(this.spaces);
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
