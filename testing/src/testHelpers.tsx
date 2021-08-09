/**
 * This is a fun file that we've defined a custom global function that provides
 * easier testing with routing.
 */
import React from "react"
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from "@testing-library/react";

// Because we want to make this function available globally we need to define
// it here instead of below.
type RenderWithRouter = (
  renderComponent: () => React.ReactNode,
  route?: string,
) => RenderResult & { history: MemoryHistory };

// We're able to define our own function globally this way.
// Node's global: https://nodejs.org/api/globals.html#globals_global
// TS's rules: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#augmenting-globalmodule-scope-from-modules
declare global {
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter,
    }
  }

  // This lets us write "renderWithRouter" instead of "global.renderWithRouter".
  namespace globalThis {
    const renderWithRouter: RenderWithRouter
  }
};

/**
 * A globally-accessible testing helper function that wraps whatever component
 * you give it with a route so it has it properly.
 * @param renderComponent The component we want to test
 * @param route The component's expected route name
 * @returns {...RenderResult, MemoryHistory}
 */
global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }
  return {
    ...render(
      <Router history={history}>{renderComponent()}</Router>
    ),
    history
  };
};
