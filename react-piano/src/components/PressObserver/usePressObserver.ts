/**
 * This is another pattern called "Observer". Its main idea is to allow us to
 * subscribe to some events and handle them as we want to. In our case, we want
 * to subscribe to keyPress events.
 */

import { useEffect, useState } from "react";
import { Key as KeyLabel } from "../../domain/keyboard";

type IsPressed = boolean;
type EventCode = string;
type CallbackFunction = () => void;

type Settings = {
  watchKey: KeyLabel,
  onStartPress: CallbackFunction,
  onFinishPress: CallbackFunction,
};

/**
 * "The fromEventCode function takes an event code that can be presented like
 * KeyZ, KeyS, Digit9, or Digit4. It uses regex to filter out all the Key and
 * Digit prefixes and keep only a significant part of a code."
 * `KeyZ` => `Z`
 * `Digit9` => `9`
 * @param code
 * @returns
 */
function fromEventCode(code: EventCode): KeyLabel {
  const prefixRegex = /Key|Digit/gi;
  return code.replace(prefixRegex, "");
}

function equal(watchedKey: KeyLabel, eventCode: EventCode): boolean {
  return fromEventCode(eventCode).toUpperCase() === watchedKey.toUpperCase();
}

/**
 * Basically, what's happening here is that useEffect() reacts from updates to
 * the "pressed" state, which are triggered by event listeners we call with
 * handler functions. Every key press and release causes one of these two
 * handler funcitons to be called, creating a kind of activity loop.
 * The observer is triggered by physical key presses, and an observer is given
 * to each Key component. So for every Key on the page, when there is a key
 * pressed, their "watchKey" is provided and checked to see if that physical
 * action was for their key.
 * We could've designed a solution to have one single observer for all keys at
 * once. But the tutorial advocates for a princple of the separation of concerns.
 * Which posits that each Key component should handle their events themselves.
 * @param param
 * @returns
 */
export function usePressObserver({
  watchKey,
  onStartPress,
  onFinishPress,
}: Settings): IsPressed {
  const [pressed, setPressed] = useState<IsPressed>(false);

  useEffect(() => {
    function handlePressStart({ code }: KeyboardEvent): void {
      if (pressed || !equal(watchKey, code)) {
        return;
      }
      setPressed(true);
      onStartPress();
    }

    function handlePressFinish({ code }: KeyboardEvent): void {
      if (!pressed || !equal(watchKey, code)) {
        return;
      }
      setPressed(false);
      onFinishPress();
    }

    document.addEventListener("keydown", handlePressStart);
    document.addEventListener("keyup", handlePressFinish);

    // Return is a function that executed when the component unmounts.
    return () => {
      document.removeEventListener("keydown", handlePressStart);
      document.removeEventListener("keyup", handlePressFinish);
    };
  }, [watchKey, pressed, setPressed, onStartPress, onFinishPress]);

  return pressed;
}
