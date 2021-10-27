<template>
  <div>
    <div v-for="(chord, chordIndex) in chords" :key="chordIndex" class="sameLine">
      <ChordBox
        :style="'padding-right:' + chordSpaces[chordIndex] + 'ch;'"
        :incomingChord="chord"
        :chordIndex="chordIndex"
        :lineIndex="index"
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
      badChords: [false],
      badChordLine: false,
    }),
    props: {
      index: Number,
    },
    methods: {
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
