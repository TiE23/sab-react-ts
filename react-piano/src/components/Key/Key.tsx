import { FunctionComponent } from "react";
import { usePressObserver } from "../PressObserver";
import clsx from "clsx";
import { NoteType } from "../../domain/note";
import styles from "./Key.module.css";

/**
 * Another example of using types that aren't necessary but make things look nice.
 */
type PressCallback = () => void;
type KeyProps = {
  type: NoteType,
  label: string,
  disabled?: boolean,

  onUp: PressCallback,
  onDown: PressCallback,
};

/**
 * Using the FunctionComponent because it allows VSCode's Intellitype to know
 * what props are accepted. At least, that's what the doc says. If I've been
 * lacking the ability to auto-type props unless doing it this way I'm not
 * sure... But hey, it does give us explict access to the children prop.
 *
 * clsx is a tiny library that takes in whatever args you give it and generates
 * a unique classname string for it. Useful for when props should decide if
 * there are different css rules applied to it. Might be quite useful for a F1
 * UI project in the future.
 * @param props
 * @returns
 */
export const Key: FunctionComponent<KeyProps> = (props) => {
  // Man, I swear, I've never used spread destructuring like this. Neat.
  const { type, label, onUp, onDown, ...rest } = props;

  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp
  });

  return (
    <button
      className={clsx(styles.key, styles[type], pressed && styles["is-pressed"])}
      onMouseUp={onUp}
      onMouseDown={onDown}
      type="button"
      {...rest}
    >
      {label}
    </button>
  );
};
