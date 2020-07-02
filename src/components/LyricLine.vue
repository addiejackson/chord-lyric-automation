<template>
  <span>
    <span v-for="(word, index) in words" :key="index">
      <span :style="'padding-right:' + spaces[index] + 'ch;'">{{ word }}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: "LyricLine",
  data: () => ({
    words: [],
    spaces: null
  }),
  methods: {
    addSpacesToLyric() {
      for (let i = 0; i < this.words.length; i++) {
        this.compareLyricsAndChords(i);
      }
    },
    compareLyricsAndChords(index) {
      let l = this.words;
      let c = this.chords;
      console.log(l);
      console.log(c);
      if (typeof c[index] === "undefined") {
        c.splice(index, 1, 1);
      }
      if (c[index].length > l[index].length) {
        this.spaces.splice(index, 1, c[index].length - l[index].length + 1);
      } else {
        this.spaces.splice(index, 1, 1);
      }
      console.log(this.spaces);
    }
  },
  props: ["lyric", "chords"],
  watch: {
    chords: {
      handler: function() {
        this.addSpacesToLyric();
      }
    },
    lyric: {
      handler: function() {
        this.words = this.lyric.split(" ");
        this.spaces = Array(this.lyric.split(" ").length);
        this.spaces.fill(1);
      }
    }
  },
  mounted() {
    this.words = this.lyric.split(" ");
    this.spaces = Array(this.lyric.split(" ").length);
    this.spaces.fill(1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 16px;
}
</style>
