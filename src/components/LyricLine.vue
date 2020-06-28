<template>
  <span>{{ lyricWithSpaces }}</span>
</template>

<script>
export default {
  name: "LyricLine",
  data: () => ({
    lyricWithSpaces: "",
    spaces: null
  }),
  methods: {
    addSpacesToLyric() {
      this.lyricWithSpaces = "";
      let words = this.lyric.split(" ");
      console.log(words);
      for (let i = 0; i < words.length; i++) {
        this.compareLyricsAndChords(i);
        this.lyricWithSpaces += words[i] + this.generateSpaces(this.spaces[i]);
        console.log(this.lyricWithSpaces);
      }
    },
    compareLyricsAndChords(index) {
      console.log(index);
      let l = this.lyric.split(" ");
      let c = this.chordArray;
      if (typeof c[index] === "undefined") {
        c[index] = 1;
      }
      console.log(c[index]);
      console.log(l[index]);
      if (c[index].length > l[index].length) {
        this.spaces[index] = c[index].length - l[index].length + 1;
      } else {
        this.spaces[index] = 1;
      }
    },
    generateSpaces(number) {
      let spaces = "";
      for (let i = 0; i < number; i++) {
        spaces += "\xa0";
      }
      return spaces;
    }
  },
  props: {
    lyric: String,
    chordArray: Array
  },
  watch: {
    chordArray: {
      handler: function() {
        this.addSpacesToLyric();
      },
      deep: true
    }
  },
  mounted() {
    this.spaces = Array(this.lyric.split(" ").length);
    this.spaces.fill(1);
    this.lyricWithSpaces = this.lyric;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
