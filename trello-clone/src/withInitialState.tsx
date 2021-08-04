import { useState, useEffect, ComponentType } from "react";
import { AppState } from "./state/appStateReducer";

// Type that represents the props we're injecting with this HOC.
type InjectedProps = {
  initialState: AppState,
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

/**
 * An "Injector HOC".
 * @param WrappedComponent A component that has an intersection of props.
 * @returns
 */
export function withInitialState<TProps>(
  // WrappedComponent: ComponentType<TProps & InjectedProps>
  WrappedComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) {
  // Omit is a TS type that removes initialState prop from the given Props.
  // This forcibly removes any user's attempt to add their own "initialState" prop.
  // return (props: Omit<TProps, keyof InjectedProps>) => {

  // But we do a slight improvement and adopt "PropsWithoutInjected".
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState < AppState>({
      lists: [],
      draggedItem: null,
    });
    return (
      <WrappedComponent
        // {...props as TProps}  // This is important because TS isn't that smart!
        {...props}  // Cleaner using PropsWithoutInjected
        initialState={initialState}
      />
    );
  };
}
