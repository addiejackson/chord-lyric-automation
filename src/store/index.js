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

function computeWordSpaces(state, chord, lineIndex, chordIndex) {
  let wordLength = state.chordLyricMap[lineIndex].lyrics[chordIndex].length
  if (wordLength == 0) {
    return Math.abs(chord.length) + 1
  }
  if (wordLength < chord.length) {
    return Math.abs(chord.length - wordLength) + 1
  }
  return 1
}

export default new Vuex.Store({
  state: {
    lyricArray: [],
    chordLyricMap: [],
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
      state.chordLyricMap[index] = {}
      structure.forEach((entry) => {
        Vue.set(state.chordLyricMap[index], entry, payload.structure[entry])
      })
    },
    updateChords(state, payload) {
      let lineIndex = payload.lineIndex
      let chordIndex = payload.chordIndex
      let chord = payload.chord

      let clm = state.chordLyricMap[lineIndex]

      clm.chords.splice(chordIndex, 1, chord)
      clm.chordSpaces.splice(
        chordIndex,
        1,
        computeChordSpaces(state, chord, lineIndex, chordIndex)
      )
      clm.lyricSpaces.splice(
        chordIndex,
        1,
        computeWordSpaces(state, chord, lineIndex, chordIndex)
      )

      Vue.set(state.chordLyricMap, lineIndex, clm)
    },
    updateLyrics(state, payload) {
      let lineIndex = payload.lineIndex
      let wordIndex = payload.wordIndex
      let word = payload.word
      state.chordLyricMap[lineIndex].lyrics.splice(wordIndex, 1, word)
    },
  },
  strict: debug,
})
