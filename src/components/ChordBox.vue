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
  export default {
    data: () => ({
      chordBoxSize: 1,
      chordInput: "",
      chordSuffix: "",
      chordBoxAlert: "",
      root: "",
      rootPosition: 0,
    }),
    props: {
      incomingChord: String,
      chordIndex: Number,
      lineIndex: Number,
    },
    mounted() {
      if (this.incomingChord) {
        this.chordInput = this.incomingChord;
        this.chordHandler();
      }
    },
    methods: {
      chordHandler() {
        this.resizeChordBox();
        this.validateRoot();

        if (this.root) {
          this.indexRoot();
          this.getSuffix();
        }
      },
      resizeChordBox() {
        this.chordBoxSize = this.chordInput.length;
        if (this.chordBoxSize <= 1) {
          this.chordBoxSize = 1;
          this.chordBoxAlert = "";
        }
      },
      validateRoot() {
        if (this.chordInput) {
          let potentialRoot = this.chordInput.substring(0, 2);
          // If root is in the approved root set
          if (this.rootSet.includes(potentialRoot)) {
            this.chordBoxAlert = "";
            this.root = potentialRoot;
            this.$store.commit("enableTranspose");
            return;
          }

          // Alert user if there's a flat/sharp mismatch
          if (
            (potentialRoot[1] == "b" && this.accidental == "sharp") ||
            (potentialRoot[1] == "#" && this.accidental == "flat")
          ) {
            this.chordBoxAlert = "background-color:#DB848D;";
            this.root = null;
            this.$store.commit("disableTranspose");
            return;
          }

          // If root is a natural, ignore #/b requirement
          if (this.rootSet.includes(potentialRoot[0])) {
            this.chordBoxAlert = "";
            this.root = potentialRoot[0];
            this.$store.commit("enableTranspose");
            return;
          }
          this.chordBoxAlert = "background-color:#DB848D;";
        }
        this.root = null;
      },
      indexRoot() {
        this.rootPosition = this.rootSet.indexOf(this.root);
      },
      getSuffix() {
        this.chordSuffix = this.chordInput.replace(this.root, "");
      },
      transpose(n) {
        if (this.chordInput) {
          let transposedPos = this.rootPosition + n;

          // Ensure rootSet is a never-ending array
          transposedPos = transposedPos % 12;
          if (transposedPos < 0) {
            transposedPos = transposedPos + 12;
          }
          this.chordInput = this.rootSet[transposedPos] + this.chordSuffix;
          this.resizeChordBox();
        }
      },
      transmuteRoot() {
        if (this.root) {
          this.root = this.rootSet[this.rootPosition];
          this.chordInput = this.root + this.chordSuffix;
        }
      },
    },
    watch: {
      incomingChord: function() {
        this.chordInput = this.incomingChord;
      },
      chordInput() {
        this.$store.commit("updateChords", {
          lineIndex: this.lineIndex,
          chordIndex: this.chordIndex,
          chord: this.chordInput,
        });
        this.chordHandler();
      },
      accidental: function() {
        this.transmuteRoot();
        this.chordHandler();
      },
      transposeCount: function(newVal, oldVal) {
        this.transpose(newVal - oldVal);
      },
    },
    computed: {
      accidental() {
        return this.$store.state.accidental;
      },
      rootSet() {
        return this.$store.state.rootSet;
      },
      transposeCount() {
        return this.$store.state.transposeCount;
      },
    },
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
