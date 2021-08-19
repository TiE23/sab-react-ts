import { FunctionComponent, useState } from "react";
import { DEFAULT_INSTRUMENT } from "../../domain/sound";
import { InstrumentContext } from "./Context";

/**
 * "The InstrumentContextProvider is a component that keeps the instrument value
 * in a local state and exposes the setInstrument() method to update it. We use
 * Context.Provider to set a value and render children inside. That will help us
 * to wrap our entire application in this provider and gain access to the
 * InstrumentContext from anywhere."
 */
export const InstrumentContextProvider: FunctionComponent = ({
  children,
}) => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};
