<template>
  <v-container class="pa-0 my-0">
    <v-row>
      <v-col class="py-0 mt-0">
        <ChordLine
          :spaces="spaces"
          :lyric="lyric"
          :transposeN="transposeN"
          @chordsEntered="captureChords($event)"
          @disableTranspose="disable($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 my-2">
        <LyricLine :lyric="lyric" :chords="chords" style="padding-top:0px;" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChordLine from "@/components/ChordLine.vue";
import LyricLine from "@/components/LyricLine.vue";
export default {
  name: "ComboLine",
  data: () => ({
    spaces: [],
    chords: []
  }),
  props: {
    lyric: String,
    transposeN: Number
  },
  methods: {
    captureChords(chords) {
      this.chords = chords;
    },
    disable(disable) {
      this.$emit("disableTranspose", disable);
    },
    dismantleLyric(l) {
      let words = l.split(" ");
      words.forEach((word, idx) => {
        if (word.includes("-")) {
          let syllables = word.split("-");
          syllables.forEach((syllable, jdx) => {
            if (jdx != syllables.length - 1) {
              syllables[jdx] += "-";
            }
          });
          words[idx] = syllables;
        }
      });
      return words.flat();
    }
  },
  watch: {
    lyric: function calculateSpaces() {
      this.spaces = [];
      let words = this.dismantleLyric(this.lyric);

      this.spaces = words.map((x) => x.length);
    }
  },
  mounted() {
    let words = this.dismantleLyric(this.lyric);

    this.spaces = words.map((x) => x.length);
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
