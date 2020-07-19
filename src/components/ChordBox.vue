<template>
  <span class="chord">
    <input
      type="text"
      :size="chordBoxSize"
      :style="'width:' + chordBoxSize + 'ch;' + chordBoxAlert"
      name="chordBox"
      v-model="chordInput"
      @input="resizeInput"
      class="chordBox"
    />
  </span>
</template>

<script>
import { EventBus } from "./EventBus.js";
export default {
  data: () => ({
    chordBoxSize: 1,
    chordInput: "",
    originalKey: "",
    keys: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    missedTransposes: 0,
    transposedKey: null,
    chordSuffix: "",
    chordBoxAlert: "",
    transposeN: 0,
    accidental: "flat"
  }),
  props: {
    chord: String
  },
  created() {
    EventBus.$on("accidentalChanged", (accidental) => {
      this.accidental = accidental;
    });
    EventBus.$on("transposeChanged", (tN) => {
      this.transposeN = tN;
    });
    EventBus.$on("resetTranspose", () => {
      this.transposeN = 0;
    });
  },
  methods: {
    resizeInput() {
      this.chordBoxSize = this.chordInput.length;
      if (this.chordBoxSize <= 1) {
        this.chordBoxSize = 1;
      }
      if (!this.originalKey && this.chordInput) {
        this.chordBoxAlert = "background-color:#DB848D;";
        this.$emit("disableTranspose", true);
      } else {
        this.chordBoxAlert = "";
        this.$emit("disableTranspose", false);
      }
      this.$emit("chordEntered", this.chordInput);
    },
    isolateKey() {
      let root = this.chordInput.substring(0, 2);
      if (this.keys.includes(root)) {
        this.chordSuffix = this.chordInput.substring(2);
        return root;
      }
      if (this.keys.includes(root[0])) {
        this.chordSuffix = this.chordInput.substring(1);
        return root[0];
      }
      return null;
    },
    transpose(transposeN) {
      console.log(transposeN);
      if (!this.originalKey) {
        // this.transposedKey = this.originalKey;
        this.missedTransposes = transposeN;
      }
      if (this.originalKey) {
        let keyPos = this.keys.indexOf(this.originalKey);
        let transposedPos = keyPos + transposeN - this.missedTransposes;
        transposedPos = transposedPos % 12;
        if (transposedPos < 0) {
          transposedPos = transposedPos + 12;
        }
        this.transposedKey = this.keys[transposedPos];
        this.chordInput = this.transposedKey + this.chordSuffix;
        this.chordBoxSize = this.chordInput.length;
        this.$emit("chordEntered", this.chordInput);
      }
    }
  },
  mounted() {
    console.log("mounted");
    this.chordInput = this.chord;
    this.originalKey = this.isolateKey();
    console.log(this.originalKey);
    this.resizeInput();
  },
  watch: {
    transposeN: function() {
      this.transpose(this.transposeN);
    },
    chord: function() {
      if (!this.originalKey) {
        this.originalKey = this.isolateKey();
      }
      this.chordInput = this.chord;
      this.resizeInput();
    },
    accidental: function() {
      let key = this.isolateKey();
      let keyPos = this.keys.indexOf(key);
      let originalKeyPos = this.keys.indexOf(this.originalKey);
      if (this.accidental == "sharp") {
        this.keys = [
          "C",
          "C#",
          "D",
          "D#",
          "E",
          "F",
          "F#",
          "G",
          "G#",
          "A",
          "A#",
          "B"
        ];
      } else {
        this.keys = [
          "C",
          "Db",
          "D",
          "Eb",
          "E",
          "F",
          "Gb",
          "G",
          "Ab",
          "A",
          "Bb",
          "B"
        ];
      }
      if (key) {
        key = this.keys[keyPos];
        this.chordInput = key + this.chordSuffix;
        this.transposedKey = key;
        this.originalKey = this.keys[originalKeyPos];
      }
    }
  }
};
</script>

<style scoped>
.chordBox {
  font-size: 16px;
  font-weight: 300;
  font-family: "Courier New", Courier, monospace;
  padding: 0;
  box-sizing: content-box;
  cursor: pointer;
}

.nonExporting {
  border-bottom: 1px solid gray;
  border-radius: 1px;
  background-color: lightgrey;
}

.chordBoxClass:focus {
  background-color: white;
  border: 0;
}
</style>
