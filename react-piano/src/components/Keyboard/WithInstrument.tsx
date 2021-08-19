import { useAudioContext } from "../AudioContextProvider";
import { useSoundFont } from "../../adapters/Soundfont/useSoundfont";
import { useMount } from "../../utils/useMount";
import { Keyboard } from "../Keyboard";

// This is the code from the written guide. But it wouldn't work.
export const KeyboardWithInstrument = () => {
  // The use of ! at the end to tell the TypeChecker that it won't be null.
  // We're sure because we won't render this component unless we have audio
  // context -- that the browser supports it.
  const AudioContext = useAudioContext()!;
  const { loading, play, stop, load } = useSoundFont({ AudioContext });

  // Allows us to run some code right after a component is mounted into the DOM.
  useMount(load);


  return <Keyboard loading={loading} play={play} stop={stop} />;
};
