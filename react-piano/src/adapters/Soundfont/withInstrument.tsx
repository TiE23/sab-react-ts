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

/**
 * Pay attention to the extends keyword in the type arguments declaration. This is a generic
 * constraint. We use it to define that TProps must include properties that those described in
 * InjectedProps type, otherwise, TypeScript should give us an error.
 *
 * Why use constraints and not just InjectedProps right away? We don't always know what props will
 * accept the component that should be enhanced. So if we use InjectedProps but the component
 * accepts another prop soundLevel it won't be possible to enhance it.
 *
 * When we use extends we tell TypeScript that it is okay to use any component that accepts
 * InjectedProps even if there are more props than that.
 *
 * Also, notice that by default we define TProps to be InjectedProps type using the = sign. This is
 * the default type for this generic. It works exactly like default values for arguments in functions.
 *
 * @param WrappedComponent
 */
export function withInstrument<
  TProps extends InjectedProps = InjectedProps,
>(WrappedComponent: ComponentType<TProps>) {
  // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  return class WithInstrument extends Component<ProviderProps, ProviderState> {
    // Makes debugging better!
    public static displayName = `withInstrument(${displayName})`;

    // --- START --- Identical to SoundfontProvicerClass.ts --- START ---
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
    // --- END --- Identical to SoundfontProvicerClass.ts --- END ---

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
  };
}
