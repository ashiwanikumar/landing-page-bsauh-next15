import React, { useMemo } from "react";
import { initializeStore } from "../redux/store";

// Identifier for the Redux store in the window object
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

// Helper to detect server vs client environment
const isServer = typeof window === "undefined";

/**
 * Gets an existing store or creates a new one
 * Ensures we always have a fresh store on the server
 * But reuse the same store instance on the client for consistent state
 */
function getOrCreateStore(initialState) {
  // Always create a new store on server side to avoid shared state between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // On client side, create the store once and reuse it
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

/**
 * Higher-order component that wraps the provided component with Redux store
 * @param {React.Component} App - The Next.js App component
 */
export default function withReduxStore(App) {
  // Return a functional component instead of a class
  const WithRedux = (props) => {
    const { initialReduxState } = props;

    // Use useMemo to ensure the store is only created once per component instance
    const reduxStore = useMemo(
      () => getOrCreateStore(initialReduxState),
      [initialReduxState]
    );

    // Use JSX instead of React.createElement for better readability
    return <App {...props} reduxStore={reduxStore} />;
  };

  // Static method for Next.js data fetching
  WithRedux.getInitialProps = async (appContext) => {
    // Create or get Redux store
    const reduxStore = getOrCreateStore();

    // Provide the store to the Next.js context
    appContext.ctx.reduxStore = reduxStore;

    // Call the App's original getInitialProps if it exists
    let appProps = {};
    if (typeof App.getInitialProps === "function") {
      appProps = await App.getInitialProps(appContext);
    }

    // Return props including the initial Redux state
    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };

  return WithRedux;
}
