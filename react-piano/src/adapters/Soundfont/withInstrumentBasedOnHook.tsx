/**
 * This is an example of using hooks to build an HOC. There's more to it than
 * what you see here (the start, stop, load, and resume functions are elsewhere)
 * but honestly this kinda just makes you appreciate how much easier it is to
 * write and read React code when using hooks.
 *
 * My opinion is that if you're already using hooks a bunch... your HOC should
 * probably just look like this.
 */

import { ComponentType, useEffect } from "react";
import { InstrumentName } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { useSoundFont } from "./useSoundfont";

type InjectedProps = {
  loading: boolean,
  play(note: MidiValue): Promise<void>,
  stop(note: MidiValue): Promise<void>,
};

type ProviderProps = {
  AudioContext: AudioContextType,
  instrument?: InstrumentName,
};

export const withInstrument = (
  WrappedComponent: ComponentType<InjectedProps>,
) => {
  return function WithInstrumentComponent(props: ProviderProps) {
    const { AudioContext, instrument } = props;
    const fromHook = useSoundFont({ AudioContext });
    const { loading, current, play, stop, load } = fromHook;

    useEffect(() => {
      if (!loading && instrument !== current) {
        load(instrument);
      }
    }, [load, loading, current, instrument]);

    return (
      <WrappedComponent loading={loading} play={play} stop={stop} />
    );
  };
};
