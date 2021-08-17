/// <reference types="react-scripts" />

/**
 * We have to deal with this because some browsers access AudioContext through
 * window.AudioContext and some through window.webkitAudioContext.
 * So, since the webkit version is non-standard we need to extend Window here.
 */
type AudioContextType = typeof AudioContext;

interface Window extends Window {
  webkitAudioContext: AudioContextType
}
