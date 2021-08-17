const C1_MIDI_NUMBER = 24;
const C4_MIDI_NUMBER = 60;
const B5_MIDI_NUMBER = 83;

export const LOWER_NOTE = C4_MIDI_NUMBER;
export const HIGHER_NOTE = B5_MIDI_NUMBER;
export const SEMITONES_IN_OCTAVE = 12;

export type NoteType = "natural" | "flat" | "sharp";
export type NotePitch = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type OctaveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type MidiValue = number; // "Why bother with this?" It's helpful!
export type PitchIndex = number;  // This can help with meaning behind values.

export type Note = {
  midi: MidiValue,
  type: NoteType,

  pitch: NotePitch,
  index: PitchIndex,
  octave: OctaveIndex,
};

export const NATURAL_PITCH_INDICIES: PitchIndex[] = [0, 2, 4, 5, 7, 9, 11];

// Records are useful to marry two types together as key and values.
// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype
export const PITCHES_REGISTRY: Record<PitchIndex, NotePitch> = {
  0: "C",
  1: "C",
  2: "D",
  3: "D",
  4: "E",
  5: "F",
  6: "F",
  7: "G",
  8: "G",
  9: "A",
  10: "A",
  11: "B",
};

/**
 * Here we take a MidiValue as an argument and determine in which octave this
 * note is. After that, we figure out what index this note has inside of its
 * octave, and what pitch this note is. Finally, we determine which type this
 * note is, and return a created note object.
 * @param midi
 * @returns
 */
export function fromMidi(midi: MidiValue): Note {
  const pianoRange = midi - C1_MIDI_NUMBER;
  const octave = (
    Math.floor(pianoRange / SEMITONES_IN_OCTAVE) + 1
  ) as OctaveIndex;

  const index = pianoRange % SEMITONES_IN_OCTAVE;
  const pitch = PITCHES_REGISTRY[index];

  const isSharp = !NATURAL_PITCH_INDICIES.includes(index);
  const type = isSharp ? "sharp" : "natural";

  return { octave, pitch, index, type, midi };
}

type NotesGeneratorSettings = {
  fromNote?: MidiValue,
  toNote?: MidiValue,
};

/**
 * This is using some real pro-level tricks. The default values being set while
 * destructuring is pretty ballsy and slick. It's because the settings type
 * above is set to have optional values that we can implement default values
 * like we do.
 *
 * "It is better to use a settings object than optional function arguments since
 * arguments rely on their order, and object keys don't. So, we destructure a
 * given settings object to get access to the fromNote and toNote fields of
 * that object. If none is given we use an empty object as settings.""
 * @param param0
 * @returns
 */
export function generateNotes({
  fromNote = LOWER_NOTE,
  toNote = HIGHER_NOTE,
}: NotesGeneratorSettings = {}): Note[] {
  /**
   * This is pretty fun utilization of fill() and map() to have a single-line
   * return line instead of writing a forloop. Very Python-esqe in my opinion.
   */
  return Array(toNote - fromNote + 1)
    .fill(0)
    .map((_, index: number) => fromMidi(fromNote + index));
}

export const notes = generateNotes();
