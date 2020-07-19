<template>
  <!-- TOP SECTION: Bowstring, Help, Title, FLAT/SHARP, TRANSPOSE, LYRIC INPUT -->
  <v-container class="py-0 mt-6">
    <v-row align="center" class="pb-1">
      <!-- page title -->
      <v-col class="pt-0 my-0 pb-3 pr-0" cols="9" align="left">
        <p>
          <v-icon
            style="vertical-align:middle;margin-bottom:5px; color:#5F917A;"
            >mdi-music-note</v-icon
          >
          <b>Bowstring</b>
        </p>

        <!-- help dialog -->
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              name="helpMenu"
              class="mx-2"
              fab
              dark
              small
              text
              color="#5F917A"
              v-on="on"
              v-bind="attrs"
              style="margin-bottom:2px;"
            >
              <v-icon dark>mdi-information-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline" primary-title
              >Bowstring Help</v-card-title
            >
            <v-divider></v-divider>
            <v-card-text>
              <br />
              <b>To add a solo chordbox:</b> Type a ">" followed by the chord
              (i.e. <code>>Gmaj7</code>).
              <br />
              <b>To copy:</b> Click the clipboard icon.
              <br />
              <br />If a chordbox is red, the root note is invalid.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- FLATS/SHARP selection -->
      <v-col class="py-0 my-0" cols="2" align="right" justify="center">
        <v-btn-toggle
          v-model="accidental"
          style="flex-direction: column; padding:0px; margin-top:0px; margin-bottom:0px; border-radius:2px; width:px; min-width:0px;"
          dense
          mandatory
          group
          background-color="none"
          @change="emitAccidental"
        >
          <!-- flat selection -->
          <v-tooltip left open-delay="750">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                depressed
                block
                text
                value="flat"
                color="#5F917A"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-music-accidental-flat</v-icon>
              </v-btn>
            </template>
            <span>flat notation</span>
          </v-tooltip>

          <!-- sharp selection -->
          <v-tooltip left open-delay="750">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                depressed
                block
                text
                value="sharp"
                color="#5F917A"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-music-accidental-sharp</v-icon>
              </v-btn>
            </template>
            <span>sharp notation</span>
          </v-tooltip>
        </v-btn-toggle>
      </v-col>

      <!-- TRANSPOSE SECTION -->
      <!-- transpose up button -->
      <v-col class="py-0 my-0" cols="1" align="right" justify="center">
        <v-tooltip right open-delay="750">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              fab
              class="py-0 my-0"
              :disabled="disableTranspose"
              color="#5F917A"
              @click="transpose(1)"
              name="transposeUp"
              style="min-width:0px; padding:10px;"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark large>mdi-chevron-up</v-icon>
            </v-btn>
          </template>
          <span>transpose up</span>
        </v-tooltip>

        <!-- transpose down button -->
        <v-tooltip right open-delay="750">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="py-0 my-0"
              small
              text
              fab
              color="#5F917A"
              @click="transpose(-1)"
              name="transposeDown"
              :disabled="disableTranspose"
              style="min-width:0px; padding:10px;"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark large>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>transpose down</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <!-- TITLE + LYRIC INPUT BOXES -->
    <v-row align="center">
      <v-col cols="7" class="py-0 my-0">
        <!-- title input box -->
        <v-text-field
          class="py-0 my-0"
          id="titlebox"
          type="text"
          name="titlebox"
          v-model="title"
          label="Project/Song Title"
          hide-details
          tabindex="1"
          style="font-weight:bold;"
        />
      </v-col>

      <v-col cols="2"></v-col>
    </v-row>
    <v-row>
      <!-- lyric input box -->
      <v-col class="py-0 my-0" cols="12">
        <v-textarea
          id="lyrics"
          name="lyrics"
          v-model="lyrics"
          background-color="white"
          rows="5"
          full-width
          placeholder="Enter your lyrics!"
          tabindex="2"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row align="center">
      <!-- SUBMIT BUTTON -->
      <v-col class="py-0 my-0" cols="2">
        <v-tooltip right open-delay="750">
          <template v-slot:activator="{ on, attrs }">
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
              tabindex="3"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
          </template>
          <span>submit lyrics</span>
        </v-tooltip>
      </v-col>

      <!-- COPY + EXPORT BUTTONS -->
      <v-col class="py-0 my-0" cols="1" offset="8">
        <!-- copy button -->
        <v-tooltip left open-delay="750">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="copyText"
              class="py-1 my-0"
              small
              text
              block
              color="#5F917A"
              :disabled="!lyricArray"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ `mdi-${clipboardIcon}` }}</v-icon>
            </v-btn>
          </template>
          <span>copy lyrics + chords</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "./EventBus.js";
export default {
  data: () => ({
    lyrics: "",
    lyricArray: null,
    title: "",
    transposeN: 0,
    dialog: false,
    clipboardIcon: "clipboard-outline",
    accidental: "flat",
    disableTranspose: true
  }),

  methods: {
    lyricsDone() {
      this.transposeN = 0;
      this.lyricArray = this.lyrics.split("\n");
      EventBus.$emit("resetTranspose");
      this.$emit("lyricsDone", this.lyricArray);
      this.clipboardIcon = "clipboard-outline";
    },
    titleEntered() {
      this.$emit("titleEntered", this.title);
      this.clipboardIcon = "clipboard-outline";
    },
    transpose(direction) {
      this.transposeN += direction;
      console.log(this.transposeN);
      EventBus.$emit("transposeChanged", this.transposeN);
    },
    copyText() {
      this.$emit("copyText");
      this.clipboardIcon = "clipboard-check";
    },
    emitAccidental() {
      EventBus.$emit("accidentalChanged", this.accidental);
      this.clipboardIcon = "clipboard-outline";
    }
  },
  created() {
    EventBus.$on("disableTranspose", (dt) => {
      this.disableTranspose = dt;
    });
    EventBus.$on("resetCopy", () => {
      this.clipboardIcon = "clipboard-outline";
      // Reset fires on any time a chord is changed
      // or CREATED in a chord box, so we want
      // to capture the accidental as well.
      EventBus.$emit("accidentalChanged", this.accidental);
    });
  }
};
</script>

<style scoped>
/* app title block */
p {
  float: left;
  text-align: left;
  font-size: 26px;
  margin-bottom: 0px !important;
}

/* title text field */
.v-text-field {
  font-family: "Courier New", Courier, monospace;
  background-color: white;
  border-radius: 2px;
  border-color: #dcdcdc;
  font-size: 14px;
}

/* lyric input field */
.v-textarea {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
}
</style>
