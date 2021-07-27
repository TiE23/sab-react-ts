import { useRef, useEffect} from "react";

export const useFocus = () => {
  // There's a lot of specific behavior of using null initializer and an element
  // type. Look at the useRef's hover-over.
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // In practice this won't ever be null so long as we only call this function
    // when the Input element exists.
    ref.current?.focus();
    console.log('focus!');
  }, []);

  return ref;
};
