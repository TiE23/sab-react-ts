import {
  FunctionComponent,
  ReactElement,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import SoundFont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";
import { Optional } from "../../domain/types";

/**
 * Similar to the "Adapted" interface in useSoundfont.ts.
 */
type ProvidedProps = {
  loading: boolean,
  play(note: MidiValue): Promise<void>,
  stop(note: MidiValue): Promise<void>,
};

type ProviderProps = {
  instrument?: InstrumentName,
  AudioContext: AudioContextType,
  render(props: ProvidedProps): ReactElement,
};

export const SoundfontProvider: FunctionComponent<ProviderProps> = ({
  AudioContext,
  instrument,
  render,
}) => {
  let activeNodes: AudioNodesRegistry = {};

  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());

  // useCallback memoizes the funtion, only changing if [instrument] changes.
  // This makes good sense. It's like it freezes your function in place.
  const loadInstrument = useCallback(() => load(instrument), [instrument]);

  async function load(
    instrument: InstrumentName = DEFAULT_INSTRUMENT,
  ) {
    setLoading(true);
    const player = await SoundFont.instrument(
      audio.current,
      instrument,
    );

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
    activeNodes[note]!.stop();
    activeNodes = { ...activeNodes, [note]: null };
  }
  async function resume() {
    return audio.current.state === "suspended"
      ? await audio.current.resume()
      : Promise.resolve();
  }

  /**
   * "Here, we use useEffect() to capture the moment when an instrument prop
   * changes and load a new sounds set for that instrument. However we don't
   * call load() function, instead we call a memoized version of it - this is
   * possible because of the useCallback() hook."
   */
  useEffect(() => {
    if (!loading && instrument !== current) {
      loadInstrument();
    }
  }, [loadInstrument, loading, instrument, current]);

  return render({
    loading,
    play,
    stop,
  });
};

