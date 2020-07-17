export const CopyChordsAndLyrics = {
  methods: {
    getValue(span) {
      if (span.className == "chord") {
        return span.children[0].value ? span.children[0].value : " ";
      } else {
        return span.innerText;
      }
    },
    getSpaces(span) {
      return " ".repeat(span.style.paddingRight.slice(0, -2));
    },
    saveToClipboard(text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    copyChordsAndLyrics(spans) {
      let text = "";
      let currentClass = "chord";
      spans.forEach((span) => {
        if (span.className != currentClass) {
          currentClass = span.className;
          // filter out onlyChords class to not
          // get an extra line by
          // lyric > onlyChords > chord
          if (span.className != "onlyChords") {
            text += "\n";
          }
        }
        text += this.getValue(span);
        text += this.getSpaces(span);
      });
      this.saveToClipboard(text);
    }
  }
};
