// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

import { Optional } from "./types";

export function accessContext(): Optional<AudioContextType> {
  return window.AudioContext || window.webkitAudioContext || null;
}