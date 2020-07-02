<template>
  <v-container class="py-0 mt-6" style="max-width:1050px;">
    <v-row align="center">
      <v-col class="py-0 my-0" cols="8">
        <p><b> Get them chords, yo</b></p>
      </v-col>
      <v-col class="py-0 my-0" cols="2" offset="2">
        <v-btn
          class="py-1 my-0"
          small
          depressed
          block
          :disabled="disableTranspose"
          color="#5F917A"
          style="color:white;"
          @click="transposeUp()"
          name="transposeUp"
          >Transpose Up
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="8" class="py-0 my-0">
        <v-text-field
          class="py-0 my-0"
          id="titlebox"
          type="text"
          name="titlebox"
          v-model="title"
          placeholder="Project/Song Title"
          hide-details
          dense
          tabindex="1"
        />
      </v-col>
      <v-col cols="2" offset="2" class="py-0 my-0">
        <v-btn
          class="py-0 my-0"
          small
          depressed
          block
          color="#5F917A"
          style="color:white;"
          @click="transposeDown()"
          name="transposeDown"
          :disabled="disableTranspose"
        >
          Transpose Down
        </v-btn>
      </v-col>
    </v-row>
    <br />
    <!-- <label for="lyrics" style="text-align:left; margin-left:20%; float:left;">Type your lyrics:</label> -->
    <v-row>
      <v-col class="py-0 my-0">
        <v-textarea
          id="lyrics"
          name="lyrics"
          v-model="lyrics"
          background-color="white"
          rows="5"
          cols="33"
          placeholder="Enter your lyrics!"
          outlined
          tabindex="3"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 my-0" cols="2">
        <v-btn
          small
          depressed
          block
          color="#5F917A"
          style="color:white;"
          @click="
            lyricsDone();
            titleEntered();
          "
          name="submitLyrics"
        >
          Submit Lyrics
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    lyrics: "",
    lyricArray: null,
    title: "",
    transposeN: 0,
  }),
  props: {
    disableTranspose: Boolean,
  },
  methods: {
    lyricsDone() {
      this.lyricArray = this.lyrics.split("\n");
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
    },
  },
};
</script>

<style scoped>
/* app title block */
p {
  float: left;
  text-align: left;
  font-size: 24px;
  font-family: "Courier New", Courier, monospace;
}

/* title text field */
.v-text-field {
  font-family: "Courier New", Courier, monospace;
  background-color: white;
  border-radius: 2px;
  border-color: lightgray;
  /* box-sizing: border-box; */
}
.v-text-field:focus {
  background-color: lightgray;
}

/* lyric input field */
.v-textarea {
  font-family: "Courier New", Courier, monospace;
  border-radius: 2px;
}

/* button styling - some values limited to vbtn tag */
.v-btn {
  border-radius: 2px;
  border-color: lightgray;
}
</style>
