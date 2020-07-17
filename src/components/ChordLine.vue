<template>
  <div>
    <div
      v-for="(arrowChord, index) in arrowChords"
      :key="index"
      class="sameLine"
    >
      <ChordBox
        :exporting="exporting"
        @chordEntered="captureChord($event, index)"
        @disableTranspose="andDisable($event, index)"
        :accidental="accidental"
        :transposeN="transposeN"
        :style="'padding-right:' + chordSpaces[index] + 'ch;'"
        :chord="arrowChord"
      />
    </div>
  </div>
</template>

<script>
import ChordBox from "@/components/ChordBox.vue";
import { DismantleLyric } from "@/mixins/DismantleLyric.js";

export default {
  name: "ChordLine",
  mixins: [DismantleLyric],
  data: () => ({
    wordCount: 1,
    chords: null, // will need to capture this from ChordBox,
    badChords: null,
    badChordLine: false,
    words: null
  }),
  props: {
    arrowChords: Array,
    chordSpaces: Array,
    line: Number,
    transposeN: Number,
    exporting: Boolean,
    accidental: String
  },
  methods: {
    captureChord(val, index) {
      this.chords.splice(index, 1, val);
      this.$emit("chordsEntered", { chord: val, index: index });
    },
    andDisable(disable, index) {
      this.badChords.splice(index, 1, disable);
      this.badChordLine = this.badChords.some((badChord) => badChord == true);
      this.$emit("disableTranspose", this.badChordLine);
    }
  },
  mounted() {
    this.chords = this.arrowChords;
    this.badChords = Array(this.wordCount);
    this.badChords.fill(false);
  },
  components: {
    ChordBox
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sameLine {
  float: left;
}
</style>
