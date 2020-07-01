<template>
  <div>
    <br />
    <br />
    <input
      id="titlebox"
      type="text"
      name="titlebox"
      v-model="title"
      placeholder="Project/Song Title"
    />
    <div style="margin-right:20%;">
      <button @click="transposeUp()" name="transposeUp">Transpose Up</button>
      <button @click="transposeDown()" name="transposeDown">Transpose Down</button>
    </div>
    <br />
    <!-- <label for="lyrics" style="text-align:left; margin-left:20%; float:left;">Type your lyrics:</label> -->
    <br />
    <textarea
      id="lyrics"
      name="lyrics"
      v-model="lyrics"
      rows="5"
      cols="33"
      placeholder="Enter your lyrics!"
    ></textarea>
    <br />
    <br />
    <button @click="lyricsDone(); titleEntered()" name="submitLyrics">Submit Lyrics</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    lyrics: "",
    lyricArray: null,
    title: "",
    transposeN: 0
  }),
  methods: {
    lyricsDone() {
      this.lyricArray = this.lyrics.split("\n");
      // this.lyrics = "";
      this.$emit("lyricsDone", this.lyricArray);
    },
    titleEntered() {
      this.$emit("titleEntered", this.title);
    },
    transposeUp() {
      this.transposeN = this.transposeN + 1;
      this.$emit("transposeChanged", this.transposeN);
    },
    transposeDown() {
      this.transposeN = this.transposeN - 1;
      this.$emit("transposeChanged", this.transposeN);
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  text-align: left;
  background-color: white;
  border: none;
  border-bottom: 0.5px solid #a1a1a1;
  float: left;
  margin-left: 19.75%;
  border-radius: 0;
  width: 15%;
}
textarea {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  width: 60%;
  border: 1px solid #a1a1a1;
  border-radius: 2px;
  padding-top: 3px;
}
button[name="transposeUp"] {
  background-color: #42b983;
  border: none;
  text-align: center;
  color: white;
  font-size: 14px;
  width: 150px;
  border-radius: 2px;
  float: right;
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
button[name="transposeDown"] {
  background-color: #42b983;
  border: none;
  text-align: center;
  color: white;
  font-size: 14px;
  width: 150px;
  border-radius: 2px;
  float: right;
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
}
button[name="submitLyrics"] {
  background-color: #42b983;
  border: none;
  text-align: center;
  color: white;
  font-size: 14px;
  width: auto;
  border-radius: 2px;
  float: left;
  margin-left: 19.9%;
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
