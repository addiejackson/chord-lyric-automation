import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

function computeChordSpaces(state, chord, lineIndex, index) {
  let lyricLength = state.chordLyricMap[lineIndex].lyrics[index].length
  if (chord.length == 0) {
    return Math.abs(lyricLength)
  }
  if (lyricLength > chord.length) {
    return Math.abs(lyricLength - chord.length) + 1
  }
  return 1
}

function computeWordSpaces(state, word, lineIndex, index) {
  let chordLength = state.chordLyricMap[lineIndex].chords[index].length
  console.log(state.chordLyricMap[lineIndex].chords[index])
  console.log(chordLength)
  console.log(word.length)
  if (word.length == 0) {
    console.log(`returning ${Math.abs(chordLength) + 1} `)
    return Math.abs(chordLength) + 1
  }
  if (word.length > chordLength) {
    return Math.abs(chordLength - word.length) + 1
  }
  return 1
}

export default new Vuex.Store({
  state: {
    lyricArray: [],
    chordLyricMap: [
      {
        chords: ["Cmaj7b5", ""],
        chordSpaces: [1, 4],
        lyrics: ["donut", "song"],
        lyricSpaces: [3, 1],
      },
    ],
    key: "",
    transpose: 0,
    enableTrans: true,
    title: "",
    accidental: "flat",
  },
  getters: {
    wordCount: (state) => (index) => {
      return state.chordLyricMap[index].lyrics.length
    },
  },
  mutations: {
    resetTranspose(state) {
      state.transpose = 0
    },
    updateTranspose(state, n) {
      state.transpose += n
    },
    setLyrics(state, lyricArray) {
      state.lyricArray = lyricArray
    },
    setTitle(state, title) {
      state.title = title
    },
    setAccidental(state, accidental) {
      state.accidental = accidental
    },
    disableTranspose(state) {
      state.enableTrans = false
    },
    enableTranspose(state) {
      state.enableTrans = true
    },
    updateChordLyricMap(state, payload) {
      // payload.structure = [chord, chordSpaces, word, wordSpaces]
      let index = payload.index
      let structure = ["chords", "chordSpaces", "lyrics", "lyricSpaces"]
      structure.forEach((entry) => {
        Vue.set(state.chordLyricMap[index], entry, payload.structure[entry])
      })
    },
    updateChords(state, payload) {
      let lineIndex = payload.lineIndex
      let chordIndex = payload.chordIndex
      let chord = payload.chord
      state.chordLyricMap[lineIndex].chords.splice(chordIndex, 1, chord)

      state.chordLyricMap[lineIndex].chordSpaces.splice(
        chordIndex,
        1,
        computeChordSpaces(state, chord, lineIndex, chordIndex)
      )
    },
    updateLyrics(state, payload) {
      let lineIndex = payload.lineIndex
      let wordIndex = payload.wordIndex
      let word = payload.word
      state.chordLyricMap[lineIndex].lyrics.splice(wordIndex, 1, word)

      state.chordLyricMap[lineIndex].lyricSpaces.splice(
        wordIndex,
        1,
        computeWordSpaces(state, word, lineIndex, wordIndex)
      )
    },
  },
  strict: debug,
})
