<template>
  <span class="chord">
    <input
      type="text"
      :style="'width:' + chordBoxSize + 'ch;' + chordBoxAlert"
      name="chordBox"
      v-model="chordInput"
      @input="chordHandler"
      class="chordBox"
      autocomplete="off"
      tabindex="4"
    />
  </span>
</template>

<script>
import { EventBus } from "./EventBus.js";
export default {
  data: () => ({
    chordBoxSize: 1,
    chordInput: "",
    rootSet: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    chordSuffix: "",
    chordBoxAlert: "",
    root: "",
    rootPos: 0,
    missedTransposes: 0,
    transposeCount: 0,
    isLowercase: false
  }),
  props: {
    incomingChord: String,
    accidental: String,
    clearAll: Number
  },
  created() {
    EventBus.$on("transposeChanged", transposeCount => {
      this.transposeCount = transposeCount;
      this.transpose();
    });
  },
  mounted() {
    if (this.incomingChord) {
      this.chordInput = this.incomingChord;
      this.chordHandler();
    }
  },
  methods: {
    validateRoot() {
      if (this.chordInput) {
        let potentialRoot = this.chordInput.substring(0, 2);
        if (this.rootSet.includes(potentialRoot)) {
          this.chordBoxAlert = "";
          this.root = potentialRoot;
          this.$emit("disableTranspose", false);
          return;
        }
        if (
          (potentialRoot[1] == "b" && this.accidental == "sharp") ||
          (potentialRoot[1] == "#" && this.accidental == "flat")
        ) {
          this.chordBoxAlert = "background-color:#DB848D;";
          this.root = null;
          this.$emit("disableTranspose", true);
          return;
        }
        if (this.rootSet.includes(potentialRoot[0])) {
          this.chordBoxAlert = "";
          this.root = potentialRoot[0];
          this.$emit("disableTranspose", false);
          return;
        }
        this.chordBoxAlert = "background-color:#DB848D;";
      }
      this.root = null;
    },
    updateRootSet() {
      if (this.accidental == "flat") {
        this.rootSet = [
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
      } else if (this.accidental == "sharp") {
        this.rootSet = [
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
      }
      if (this.isLowercase) {
        this.rootSet = this.rootSet.map(v => v.toLowerCase());
      }
    },
    getSuffix() {
      this.chordSuffix = this.chordInput.replace(this.root, "");
    },
    chordHandler() {
      this.resizeChordBox();
      this.checkLowercase();
      this.updateRootSet();
      this.validateRoot();

      if (this.root) {
        this.indexRoot();
        this.getSuffix();
        this.missedTransposes = this.transposeCount;
      }
    },
    checkLowercase() {
      let potentialRoot = this.chordInput.substring(0, 2);
      if (potentialRoot === potentialRoot.toLowerCase()) {
        this.isLowercase = true;
      } else {
        this.isLowercase = false;
      }
    },
    resizeChordBox() {
      this.chordBoxSize = this.chordInput.length;
      if (this.chordBoxSize <= 1) {
        this.chordBoxSize = 1;
        this.chordBoxAlert = "";
      }
      this.$emit("chordEntered", this.chordInput);
      EventBus.$emit("chordChanged");
    },
    indexRoot() {
      this.rootPos = this.rootSet.indexOf(this.root);
    },
    transpose() {
      if (this.chordInput) {
        let transposedPos =
          this.rootPos + this.transposeCount - this.missedTransposes;

        // Ensure rootSet is a never-ending array
        transposedPos = transposedPos % 12;
        if (transposedPos < 0) {
          transposedPos = transposedPos + 12;
        }
        this.chordInput = this.rootSet[transposedPos] + this.chordSuffix;
        this.resizeChordBox();
      } else {
        this.missedTransposes = this.transposeCount;
      }
    },
    transmuteRoot() {
      if (this.transposeCount != 0) {
        // Transform root and capture it
        this.validateRoot();
        EventBus.$emit("clearTranspose");
      }
      if (this.root) {
        this.indexRoot();
        this.updateRootSet();
        this.root = this.rootSet[this.rootPos];
        this.chordInput = this.root + this.chordSuffix;
      }
    }
  },
  watch: {
    accidental: function() {
      this.transmuteRoot();
      this.chordHandler();
    },
    clearAll: function() {
      if (this.chordInput) {
        this.chordInput = "";
        this.chordHandler();
      }
    },
    incomingChord: function() {
      this.chordInput = this.incomingChord;
      this.chordHandler();
    },
    incomingChordAndClearAll: function(newVal, oldVal) {
      const oldClearAll = oldVal.split("|")[1];
      const [newIncomingChord, newClearAll] = newVal.split("|");
      if (newClearAll != oldClearAll) {
        this.chordInput = "";
      }
      if (newIncomingChord) {
        this.chordInput = this.incomingChord;
      }
      this.chordHandler();
    }
  },
  computed: {
    incomingChordAndClearAll() {
      return `${this.incomingChord}|${this.clearAll}`;
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
  border-bottom: 1px solid gray;
  border-radius: 1px;
  background-color: lightgrey;
}

.chordBoxClass:focus {
  background-color: white;
  border: 0;
}
</style>
