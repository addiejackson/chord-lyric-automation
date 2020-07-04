export const DismantleLyric = {
  methods: {
    dismantleLyric(lyric) {
      let words = lyric.split(" ");
      words.forEach((word, idx) => {
        if (word.includes("-")) {
          let syllables = word.split("-");
          syllables.forEach((syllable, jdx) => {
            if (jdx != syllables.length - 1) {
              syllables[jdx] += "-";
            }
          });
          words[idx] = syllables;
        }
      });
      return words.flat().filter(Boolean);
    }
  }
};
