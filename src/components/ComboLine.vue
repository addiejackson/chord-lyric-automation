<template>
  <div class="hello">
    <div v-for="(lyric, idx) in lyrics" :key="idx">
      <ChordLine
        :spaces="allSpaces[idx]"
        :line="idx"
        :lyric="lyric"
        @chordsEntered="captureChords($event, idx)"
      />
      <br />
      <br />
      <br />
      <br />
      <LyricLine :lyric="lyric" :chordArray="chordArray[idx]" style="padding-top:0px;" />
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
    chordArray: []
  }),
  props: {
    lyrics: Array
  },
  methods: {
    captureChords(chords, index) {
      this.chordArray.splice(index, 1, chords);
    }
  },
  watch: {
    lyrics: function calculateSpaces() {
      this.lyrics.forEach(lyric => {
        let words = lyric.split(" ");
        this.allSpaces.push(words.map(x => x.length));
      });
      console.log(this.allSpaces);
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
