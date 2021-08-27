import { Component, ComponentClass, Ref, forwardRef  } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from "../../domain/sound";

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
 * "Basically, the root cause of the problem is that we create a container-component
 * which is just an intermediate element and has no real DOM elements. So, in order
 * to be able to provide access to a DOM node, we have to pass a received ref further
 * onto an enhanced component which when rendered will result in a DOM node.""
 * @param WrappedComponent
 */
export function withInstrument<
  TProps extends InjectedProps = InjectedProps
>(WrappedComponent: ComponentClass<TProps>) {
  /**
   * Instance Type
   * https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype
   * "Constructs a type consisting of the instance type of a contructor function
   * in Type."
   * This is how we get the Type we need to put into Ref<>.
   * Then, we extend ProviderProps (using "&"; a union) to add the forwarded
   * ref as a prop.
   */
  type ComponentInstance = InstanceType<typeof WrappedComponent>;
  type WithForwardedRef = ProviderProps & {
    forwardedRef: Ref<ComponentInstance>,
  };

  const displayName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component";

  class WithInstrument extends Component<
    WithForwardedRef,
    ProviderState
  > {

    // --- START --- Identical to withInstrument.tsx --- START ---
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

    constructor(props: WithForwardedRef) {
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
    // --- END --- Identical to withInstrument.tsx --- END ---

    public render() {
      const { forwardedRef } = this.props;
      const injected = {
        loading: this.state.loading,
        play: this.play,
        stop: this.stop
      } as InjectedProps;

      return (
        <WrappedComponent
          ref={forwardedRef}
          {...(injected as TProps)}
        />
      );
    }
  }

  return forwardRef<ComponentInstance, ProviderProps>(
    (props, ref) => <WithInstrument forwardedRef={ref} {...props} />
  );
}
