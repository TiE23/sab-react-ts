import { EffectCallback, useEffect } from "react";
import { InstrumentName } from "soundfont-player";

/**
 * "First, we create a useEffectOnce() hook to encapsulate the useEffect() call
 * with an empty dependency array. This array tells React what variables to
 * observe. If either of the variables in that array changes, React will re-run
 * the effect. In our case, we only need to run the effect once, when the
 * component appears in the DOM, that's why we set it to be empty."
 * @param effect
 */
const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

/**
 * "Why not use the global Function type instead of creating a custom Effect
 * type? TypeScript by itself doesn't forbid us to use the global Function type.
 * However, there is a catch. Function accepts any function-like value. So, for
 * example, it accepts class declarations that can throw an error if called
 * incorrectly."
 */
// type Effect = (...args: unknown[]) => void;
type Effect = (instrument?: InstrumentName | undefined) => Promise<void>;

export const useMount = (fn: Effect) => {
  useEffectOnce(() => {
    fn();
  });
};
