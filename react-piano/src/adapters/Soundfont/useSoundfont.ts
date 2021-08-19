/**
 * It's worth going back to this lesson as it describes a concept called "adapters"
 * and this is it. We're taking in information from the soundfont api and returning
 * and "adapter", an interface of our liking that we can use. It's not the most
 * complex system, but it's quite useful.
 */

import { useState, useRef } from "react";
import SoundFont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import {
  AudioNodesRegistry,
  DEFAULT_INSTRUMENT
} from "../../domain/sound";

type Settings = {
  AudioContext: AudioContextType,
};

/**
 * Why is this an interface and Settings is a type? Well, type is really good for
 * shapes of data. While an interface is better for something like an "entity",
 * this is especially obvious when we're returning something like these functions
 * with very specific arguments and return values.
 */
interface Adapted {
  loading: boolean; // Useful to disable the keyboard while loading.
  current: Optional<InstrumentName>;  // The current instrument, which may be empty.

  load(instrument?: InstrumentName): Promise<void>;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
}

export function useSoundFont({ AudioContext }: Settings): Adapted {
  // This is not state because we don't want to re-render when this changes.
  let activeNodes: AudioNodesRegistry = {};

  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());

  async function load(
    instrument: InstrumentName = DEFAULT_INSTRUMENT,
  ) {
    setLoading(true);
    const player = await SoundFont.instrument(
      audio.current,
      instrument,
    );
    console.log('loaded');

    setLoading(false);
    setCurrent(instrument);
    setPlayer(player);
  }

  async function play(note: MidiValue) {
    await resume();
    if (!player) {
      return;
    }

    const node = player.play(note.toString());
    activeNodes = { ...activeNodes, [note]: node };
  }

  async function stop(note: MidiValue) {
    await resume();
    if (!activeNodes[note]) {
      return;
    }

    // This "!." is a non-null assertion operator unique to TS, it is an explicit
    // method to state "hey, it's okay, it won't be null, I checked!" that Flow's
    // Type Checker in VSCode would often miss if the logic was too complex.
    // TS still has a Type Checker in place but this lets us be explicit to help
    // it in cases where it misses it.
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    activeNodes[note]!.stop();
    activeNodes = { ...activeNodes, [note]: null };
  }

  /**
   * This function checks what state audio is in right now. If it is suspended
   * that means that AudioContext is halting audio hardware access and reducing
   * CPU/battery usage in the process. To continue we have to resume() it. And
   * since it also has an async interface we have to implement our resume()
   * wrapper as async, too.
   * If the audio wasn't suspended, we use Promise.resolve() almost like an
   * async "pass" (that is, from Python) as a kind of return value.
   * @returns
   */
  async function resume() {
    return audio.current.state === "suspended"
      ? await audio.current.resume()
      : Promise.resolve();
  }

  return {
    loading,
    current,

    load,
    play,
    stop,
  };
}
