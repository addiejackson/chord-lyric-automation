<template>
  <div class="hello">
    <ChordLine
      :spaces="spaces"
      :lyric="lyric"
      :transposeN="transposeN"
      @chordsEntered="captureChords($event)"
      @disableTranspose="disable($event)"
    />
    <br />
    <br />
    <br />
    <br />
    <LyricLine :lyric="lyric" :chords="chords" style="padding-top:0px;" />
  </div>
</template>

<script>
import ChordLine from "@/components/ChordLine.vue";
import LyricLine from "@/components/LyricLine.vue";
export default {
  name: "ComboLine",
  data: () => ({
    spaces: [],
    chords: [],
  }),
  props: {
    lyric: String,
    transposeN: Number,
  },
  methods: {
    captureChords(chords) {
      this.chords = chords;
    },
    disable(disable) {
      this.$emit("disableTranspose", disable);
    },
  },
  watch: {
    lyric: function calculateSpaces() {
      this.spaces = [];
      let words = this.lyric.split(" ");

      this.spaces = words.map((x) => x.length);
    },
  },
  mounted() {
    let words = this.lyric.split(" ");

    this.spaces = words.map((x) => x.length);
  },
  components: {
    ChordLine,
    LyricLine,
  },
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
