<template>
  <div class="hello">
    <div v-for="(lyric, idx) in lyrics" :key="idx">
      <ChordLine
        :spaces="allSpaces[idx]"
        :line="idx"
        :lyric="lyric"
        @chordsEntered="captureChords"
      />
      <br />
      <br />
      <br />
      <br />
      <LyricLine
        :lyric="lyric"
        :chordArray="chordArray"
        style="padding-top:0px;"
      />
    </div>
  </div>
</template>

<script>
import ChordLine from "@/components/ChordLine.vue";
import LyricLine from "@/components/LyricLine.vue";
export default {
  name: "ComboLine",
  data: () => ({
    allSpaces: [],
    chordArray: null
  }),
  props: {
    lyrics: Array
  },
  methods: {
    captureChords(val) {
      this.chordArray = val;
    }
  },
  watch: {
    lyrics: function calculateSpaces() {
      this.lyrics.forEach((lyric) => {
        let words = lyric.split(" ");
        this.allSpaces.push(words.map((x) => x.length));
      });
    }
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
