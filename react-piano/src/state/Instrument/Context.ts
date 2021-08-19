import { createContext, useContext } from "react";
import { InstrumentName } from "soundfont-player";
import { DEFAULT_INSTRUMENT } from "../../domain/sound";

/**
 * This is a pretty basic example of using React's context system. You have
 * an instrument and a way to set the instrument.
 */
export type ContextValue = {
  instrument: InstrumentName,
  setInstrument: (instrument: InstrumentName) => void,
};

export const InstrumentContext = createContext<ContextValue>({
  instrument: DEFAULT_INSTRUMENT,
  setInstrument() {}, // Not set.
});

export const InstrumentContextConsumer = InstrumentContext.Consumer;
export const useInstrument = () => useContext(InstrumentContext);
