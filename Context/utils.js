export const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

// Steps
const whole = 2
const half = 1

// Intervals - missing tritone
const majorSecond = whole
const minorThird = whole + half
const majorThird = 2 * whole
const perfectFourth = (2 * whole) + half
const perfectFifth = (3 * whole) + half
const minorSixth = 4 * whole
const majorSixth = (4 * whole) + half
const minorSeventh = 5 * whole
const majorSeventh = (5 * whole) + half

// Scales
const getFullScale = (root) => {
    const tempArr = notes.slice(notes.indexOf(root))
    let fullScale = notes.toSpliced(0, 0, ...tempArr)
    fullScale = fullScale.slice(0, fullScale.indexOf(root, 1))
    return fullScale
}

const getMajorScale = (root) => {
    const tempScale = getFullScale(root)
    const majorScale = [root, tempScale[majorSecond], tempScale[majorThird], tempScale[perfectFourth], tempScale[perfectFifth],
        tempScale[majorSixth], tempScale[majorSeventh]]
    return majorScale
}

const getMinorScale = (root) => {
    const tempScale = getFullScale(root)
    const minorScale = [root, tempScale[majorSecond], tempScale[minorThird], tempScale[perfectFourth], tempScale[perfectFifth],
        tempScale[minorSixth], tempScale[minorSeventh]]
    return minorScale
}

const majorChord = (root) => {
    const majorScale = getMajorScale(root)
    // 1, 3, 5 off major scale
    const majorTriad = [root, majorScale[2], majorScale[4]]
    return majorTriad
}

const minorChord = (root) => {
    const minorScale = getMinorScale(root)
    // 1, 3, 5 off minor scale
    const minorTriad = [root, minorScale[2], minorScale[4]]
    return minorTriad
}

const minorSeventhChord = (root) => {
    const minorScale = getMinorScale(root)
    // 1, 3, 5 , 7 off minor scale
    const minorSevChord = [root, minorScale[2], minorScale[4], minorScale[6]]
    return minorSevChord
}

const majorSeventhChord = (root) => {
    const majorScale = getMajorScale(root)
    // 1, 3, 5 , 7 off minor scale
    console.log(majorScale)
    const majorSevChord = [root, majorScale[2], majorScale[4], majorScale[6]]
    console.log(majorSevChord)
    return majorSevChord
}
export const chordTypes = {
    "Search All By Key": null,
    "Search By Key": undefined,
    "Scale Type": null,
    "Major": undefined,
    "Minor": undefined, 

    "Scales": null,
    'Lydian dominant': undefined,
    'Natural minor': undefined,
    'Algerian': undefined,
    'Altered': undefined,
    'Augmented': undefined,
    'Bebop dominant': undefined,
    'Blues': undefined,
    'Chromatic': undefined,
    'Dorian mode': undefined,
    'Double harmonic': undefined,
    'Enigmatic': undefined,
    'Flamenco mode': undefined,
    'Gypsy': undefined,
    'Half diminished': undefined,
    'Harmonic major': undefined,
    'Harmonic minor': undefined,
    'Hirajoshi': undefined,
    'Hungarian minor': undefined,
    'Hungarian major': undefined,
    'In': undefined,
    'Insen': undefined,
    'Major': undefined,
    'Istrian': undefined,
    'Iwato': undefined,
    'Locrian mode': undefined,
    'Lydian augmented': undefined,
    'Lydian diminished': undefined,
    'Lydian mode': undefined,
    'Major bebop': undefined,
    'Major Locrian': undefined,
    'Major pentatonic': undefined,
    'Melodic minor': undefined,
    'Melodic minor': undefined,
    'Minor pentatonic': undefined,
    'Adonai malakh mode': undefined,
    'Neapolitan major': undefined,
    'Neapolitan minor': undefined,
    'Persian': undefined,
    'Phrygian dominant': undefined,
    'Phrygian mode': undefined,
    'Prometheus': undefined,
    'Scale of harmonics': undefined,
    'Tritone': undefined,
    'Two-semitone tritone': undefined,
    'Ukrainian Dorian': undefined,
    'Whole tone': undefined,
    'Yo': undefined,

    "Major Chords": null,
    "Major Triad": majorChord,
    "Major Seventh": majorSeventhChord,

    "Minor Chords": null,
    "Minor Triad": minorChord,
    "Minor 7th": minorSeventhChord,
}