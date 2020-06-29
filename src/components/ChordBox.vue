<template>
  <span>
    <br />
    <input
      type="text"
      :size="chordBoxSize"
      :style="'width:' + chordBoxSize + 'ch;'"
      name="chordbox"
      v-model="chordInput"
      @input="resizeInput"
    />
  </span>
</template>

<script>
export default {
  data: () => ({
    chordBoxSize: 1,
    chordInput: ""
  }),
  methods: {
    resizeInput() {
      console.log(this.chordInput);
      this.chordBoxSize = this.chordInput.length;
      if (this.chordBoxSize <= 1) {
        this.chordBoxSize = 1;
      }
      this.$emit("chordEntered", this.chordInput);
    }
  }
};
</script>

<style>
input[type="text"] {
  font-size: 16px;
  font-weight: 300;
  font-family: "Courier New", Courier, monospace;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 1px;
  background-color: lightgrey;
  padding: 0;
  box-sizing: content-box;
}

input[type="text"]:focus {
  background-color: paleturquoise;
  border: 0;
}
</style>
