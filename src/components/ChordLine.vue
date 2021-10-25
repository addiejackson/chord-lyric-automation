<template>
  <div>
    <div v-for="(chord, chordIndex) in chords" :key="chordIndex" class="sameLine">
      <ChordBox
        @chordEntered="captureChord($event, index)"
        :style="'padding-right:' + chordSpaces[index] + 'ch;'"
        :incomingChord="chord"
        :chordIndex="chordIndex"
        :clearAll="clearAll"
        :lineIndex="index"
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
      badChords: null,
      badChordLine: false,
      words: null,
    }),
    props: {
      clearAll: Number,
      index: Number,
    },
    methods: {
      captureChord(val, index) {
        // if (!this.chords) {
        //   this.chords = Array(this.incomingChords.length);
        // }
        // this.chords.splice(index, 1, val);
        this.$emit("chordsEntered", { chord: val, index: index });
        EventBus.$emit("resetCopy");
      },
      andDisable(disable, index) {
        this.badChords.splice(index, 1, disable);
        this.badChordLine = this.badChords.some(badChord => badChord == true);
        if (this.badChordLine) {
          this.$store.commit("disableTranspose");
        } else {
          this.$store.commit("enableTranspose");
        }
      },
    },
    mounted() {
      this.badChords = Array(this.wordCount);
      this.badChords.fill(false);
    },
    computed: {
      chordSpaces() {
        return this.$store.state.chordLyricMap[this.index].chordSpaces;
      },
      chords: {
        get() {
          return this.$store.state.chordLyricMap[this.index].chords;
        },
      },
    },
    components: {
      ChordBox,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sameLine {
    float: left;
  }
</style>
