import { useInstrument } from "../../state/Instrument";
import { useAudioContext } from "../AudioContextProvider";
import { Keyboard } from "../Keyboard";
// import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProvider";
import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProviderClass";

// Render props
export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />} // Props match so we just destructure.
    />
  );
};

/* // Code before Render Props
import { useEffect } from "react";
import { useSoundFont } from "../../adapters/Soundfont/useSoundfont";

export const KeyboardWithInstrument = () => {
  // The use of ! at the end to tell the TypeChecker that it won't be null.
  // We're sure because we won't render this component unless we have audio
  // context -- that the browser supports it.
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();
  const { loading, current, play, stop, load } = useSoundFont({ AudioContext });

  // "We replace useMount() hook with useEffect() hook. We have to do that since
  // we want to dynamically change our instrument's sounds set, instead of
  // loading it once when mounted."
  //
  useEffect(() => {
    if (!loading && instrument !== current) {
      load(instrument);
    }
  }, [load, loading, current, instrument]);

  return <Keyboard loading={loading} play={play} stop={stop} />;
};
*/
