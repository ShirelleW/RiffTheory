export const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

const whole = 2
const half = 1

const majorThird = 2 * whole
const perfectFifth = (3 * whole) + half

// const majorScale = [root, majorThird, perfectFifth]

const getFullScale = (startingNote) => {
    const tempArr = notes.slice(notes.indexOf(startingNote))
    let fullScale = notes.toSpliced(0, 0, ...tempArr)
    fullScale = fullScale.slice(0, fullScale.indexOf(startingNote, 1) + 1)
    return fullScale
}
export const majorChord = (startingNote) => {
    const fullScale = getFullScale(startingNote)
    const chord = [startingNote, fullScale[majorThird], fullScale[perfectFifth]]
    return chord
}

export const majorNine = (startingNote) => {
    return ["c", "D"]
}

export const majorSeven = (startingNote) => {
    return ["A", "B"]
}
export const chordTypes = {
    Major: majorChord,
    Maj7: majorSeven,
    Maj9: majorNine,
}

