import { useEffect } from "react";
import { useInstrument } from "../../state/Instrument";
import { useAudioContext } from "../AudioContextProvider";
import { useSoundFont } from "../../adapters/Soundfont/useSoundfont";
import { Keyboard } from "../Keyboard";

// This is the code from the written guide. But it wouldn't work.
export const KeyboardWithInstrument = () => {
  // The use of ! at the end to tell the TypeChecker that it won't be null.
  // We're sure because we won't render this component unless we have audio
  // context -- that the browser supports it.
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();
  const { loading, current, play, stop, load } = useSoundFont({ AudioContext });

  /**
   * "We replace useMount() hook with useEffect() hook. We have to do that since
   * we want to dynamically change our instrument's sounds set, instead of
   * loading it once when mounted."
   */
  useEffect(() => {
    if (!loading && instrument !== current) {
      load(instrument);
    }
  }, [load, loading, current, instrument]);

  return <Keyboard loading={loading} play={play} stop={stop} />;
};
