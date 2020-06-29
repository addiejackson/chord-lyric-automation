<template>
  <div>
    <form>
      <div>
        <br />

        <input
          type="text"
          :size="chordBoxSize"
          name="chordbox"
          v-model="chordInput"
          @input="resizeInput"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    chordBoxSize: 1,
    chordInput: ""
  }),
  methods: {
    resizeInput() {
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
  font-family: monospace, "Courier New";
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 1px;
  background-color: lightgrey;
  margin-left: -2px;
  width: 87.5%;
}

input[type="text"]:focus {
  background-color: paleturquoise;
  border: 1px solid black;
}
</style>
