<template>
  <div>
    <div
      v-for="(incomingChord, index) in incomingChords"
      :key="index"
      class="sameLine"
    >
      <ChordBox
        @chordEntered="captureChord($event, index)"
        :style="'padding-right:' + chordSpaces[index] + 'ch;'"
        :incomingChord="incomingChord"
        @disableTranspose="andDisable($event, index)"
        :accidental="accidental"
        :clearAll="clearAll"
      />
    </div>
  </div>
</template>

<script>
import ChordBox from "@/components/ChordBox.vue";
import { DismantleLyric } from "@/mixins/DismantleLyric.js";
import { EventBus } from "./EventBus.js";

export default {
  name: "ChordLine",
  mixins: [DismantleLyric],
  data: () => ({
    wordCount: 1,
    chords: [], // will need to capture this from ChordBox,
    badChords: null,
    badChordLine: false,
    words: null,
    accidental: "flat"
  }),
  props: {
    incomingChords: Array,
    chordSpaces: Array,
    line: Number,
    clearAll: Number
  },
  methods: {
    captureChord(val, index) {
      if (!this.chords) {
        this.chords = Array(this.incomingChords.length);
      }
      this.chords.splice(index, 1, val);
      if (this.chords.every(chord => chord == false)) {
        EventBus.$emit("chordLineEmpty");
      }
      this.$emit("chordsEntered", { chord: val, index: index });
      EventBus.$emit("resetCopy");
    },
    andDisable(disable, index) {
      this.badChords.splice(index, 1, disable);
      this.badChordLine = this.badChords.some(badChord => badChord == true);
      EventBus.$emit("disableTranspose", this.badChordLine);
    }
  },
  mounted() {
    this.chords = this.incomingChords;
    this.badChords = Array(this.wordCount);
    this.badChords.fill(false);
  },
  created() {
    EventBus.$on("accidentalChanged", accidental => {
      this.accidental = accidental;
    });
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
