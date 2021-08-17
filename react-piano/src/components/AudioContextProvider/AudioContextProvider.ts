import { useRef } from "react";
import { Optional } from "../../domain/types";
import { accessContext } from "../../domain/audio";

// Kyle, take note on this use of useRef(). I really think that this will be a
// pattern I'll be taking forward in React development. Go back and look at the
// first assignment and how providers were used as well.
export function useAudioContext(): Optional<AudioContextType> {
  const AudioCtx = useRef(accessContext());
  return AudioCtx.current;
}
