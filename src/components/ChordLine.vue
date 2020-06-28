<template>
  <div>
    <div v-for="index in wordCount" :key="index" class="sameLine">
      <ChordBox @chordEntered="Gus" />
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
    chordArray: [] // will need to capture this from ChordBox
  }),
  props: {
    lyric: String,
    spaces: Array
  },
  methods: {
    countWords() {
      this.wordCount = this.lyric.split(" ").length;
      if (this.wordCount < 1) {
        this.wordCount = 1;
      }
      console.log(this.wordCount);
    },
    Gus() {
      console.log("fakers");
    }
  },
  mounted() {
    this.countWords();
    this.spaces.forEach((space) => {
      for (let i = 0; i < space; i++) {
        this.content += "\xa0";
      }
      this.content += "x";
      this.chordArray.push(this.content);
    });
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
