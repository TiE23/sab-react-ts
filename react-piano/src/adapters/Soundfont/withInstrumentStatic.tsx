/**
 * This is a demonstration component to show what it'd look like if you, say,
 * rendered a keyboard with only a single instrument. This is how you'd do it.
 * Basically, you wrap a class inside a function return. Then, look at
 * WithStaticInstrument.tsx in Keyboard/ to see how it is used.
 */
import { Component, ComponentType } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import {
  AudioNodesRegistry,
  DEFAULT_INSTRUMENT
} from "../../domain/sound";

type InjectedProps = {
  loading: boolean,
  play(note: MidiValue): Promise<void>,
  stop(note: MidiValue): Promise<void>,
};

type ProviderProps = {
  AudioContext: AudioContextType,
  instrument: InstrumentName,
};

type ProviderState = {
  loading: boolean,
  current: Optional<InstrumentName>,
};

export function withInstrumentStatic<
  TProps extends InjectedProps = InjectedProps
>(initialInstrument: InstrumentName = DEFAULT_INSTRUMENT) {
  return function enhanceComponent(
    WrappedComponent: ComponentType<TProps>
  ) {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    // --- START --- Identical to withInstrument.tsx --- START ---
    return class WithInstrument extends Component<ProviderProps, ProviderState> {
      // Makes debugging better!
      public static displayName = `withInstrument(${displayName})`;

      public static defaultProps = {
        instrument: DEFAULT_INSTRUMENT,
      };

      private audio: AudioContext;
      private player: Optional<Player> = null;
      private activeNodes: AudioNodesRegistry = {};

      public state: ProviderState = {
        loading: false,
        current: null,
      };

      constructor(props: ProviderProps) {
        super(props);
        const { AudioContext } = this.props;
        this.audio = new AudioContext();
      }

      public componentDidMount() {
        const { instrument } = this.props;
        this.load(instrument);
      }

      public shouldComponentUpdate({ instrument }: ProviderProps) {
        return this.state.current !== instrument;
      }

      public componentDidUpdate({
        instrument: prevInstrument,
      }: ProviderProps) {
        const { instrument } = this.props;
        if (instrument && instrument !== prevInstrument) {
          this.load(instrument);
        }
      }

      private load = async (instrument: InstrumentName) => {
        this.setState({ loading: true });
        this.player = await Soundfont.instrument(this.audio, instrument);
        this.setState({ loading: false, current: instrument });
      };

      public play = async (note: MidiValue) => {
        await this.resume();
        if (!this.player) {
          return;
        }

        const node = this.player.play(note.toString());
        this.activeNodes = { ...this.activeNodes, [note]: node };
      };

      public stop = async (note: MidiValue) => {
        await this.resume();
        if (!this.activeNodes[note]) {
          return;
        }
        this.activeNodes[note]!.stop();
        this.activeNodes = { ...this.activeNodes, [note]: null };
      };

      private resume = async () => {
        return this.audio.state === "suspended"
          ? await this.audio.resume()
          : Promise.resolve();
      };

      public render() {
        const injected = {
          loading: this.state.loading,
          play: this.play,
          stop: this.stop,
        } as InjectedProps;

        /**
         * The '...(injected as TProps)' is a work-around for a TS bug that erases
         * type of props when using the spread operator.
         */
        return <WrappedComponent {...(injected as TProps)} />;
      }
    }
  }
  // --- END --- Identical to withInstrument.tsx --- END ---
}