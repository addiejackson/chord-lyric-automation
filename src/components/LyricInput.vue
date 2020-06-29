<template>
  <div>
    <label for="lyrics">Type your lyrics:</label>
    <br />
    <textarea
      id="lyrics"
      name="lyrics"
      v-model="lyrics"
      rows="5"
      cols="33"
    ></textarea>
    <br />
    <button @click="lyricsDone()">Submit Lyrics</button>
    <span>{{ lyricArray }}</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    lyrics: "",
    lyricArray: null
  }),
  methods: {
    lyricsDone() {
      this.lyricArray = this.lyrics.split("\n");
      this.lyrics = "";
      this.$emit("lyricsDone", this.lyricArray);
    }
  }
};
</script>

<style>
textarea {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  width: 60%;
}
</style>
