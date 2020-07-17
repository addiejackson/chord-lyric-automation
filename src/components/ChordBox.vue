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
      :class="chordBoxDynamicClass"
    />
  </span>
</template>

<script>
export default {
  data: () => ({
    chordBoxSize: 1,
    chordInput: "",
    key: "",
    keys: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    missedTransposes: 0,
    transposedKey: null,
    chordSuffix: "",
    chordBoxAlert: ""
  }),
  props: {
    transposeN: Number,
    exporting: Boolean,
    chord: String
  },
  methods: {
    resizeInput() {
      this.chordBoxSize = this.chordInput.length;
      if (this.chordBoxSize <= 1) {
        this.chordBoxSize = 1;
      }
      this.key = this.isolateKey();
      if (!this.key && this.chordInput) {
        this.chordBoxAlert = "background-color:#C77166;";
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
      if (this.key) {
        let keyPos = this.keys.indexOf(this.key);
        let transposedPos = keyPos + transposeN - this.missedTransposes;
        transposedPos = transposedPos % 12;
        if (transposedPos < 0) {
          transposedPos = transposedPos + 12;
        }
        this.transposedKey = this.keys[transposedPos];
        this.chordInput = this.transposedKey + this.chordSuffix;
        this.chordBoxSize = this.chordInput.length;
        this.$emit("chordEntered", this.chordInput);
      } else {
        this.missedTransposes = transposeN;
      }
    }
  },
  mounted() {
    if (this.chord) {
      this.chordInput = this.chord;
      this.resizeInput();
    }
  },
  watch: {
    transposeN: function() {
      this.transpose(this.transposeN);
    },
    chord: function() {
      this.chordInput = this.chord;
      this.resizeInput();
    }
  },
  computed: {
    chordBoxDynamicClass: function() {
      if (!this.exporting) {
        return {
          nonExporting: true
        };
      } else {
        return {
          nonExporting: false
        };
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

.invalid_chord {
  background-color: #c73720;
}
</style>
