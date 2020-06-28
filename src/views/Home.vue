<template>
  <div class="home">
    <LyricInput @lyricsDone="captureLyrics"></LyricInput>
    <ComboLine :lyrics="lyrics"></ComboLine>
  </div>
</template>

<script>
// @ is an alias to /src
import ComboLine from "@/components/ComboLine.vue";
import LyricInput from "@/components/LyricInput.vue";

export default {
  name: "Home",
  data: () => ({
    lyrics: null
  }),
  methods: {
    captureLyrics(lyrics) {
      this.lyrics = lyrics;
    }
  },
  components: {
    ComboLine,
    LyricInput
  }
};
</script>
