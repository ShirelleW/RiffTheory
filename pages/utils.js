export const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const frets = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

export const majorNine = (startingNote) => {
    return ["A", "B", "c", "D", "E", "F", "G"]
}

export const majorSeven = (startingNote) => {
    return ["A", "B"]
}
export const chordTypes = {
    majorSeven: majorSeven,
    majorNine: majorNine,
}

