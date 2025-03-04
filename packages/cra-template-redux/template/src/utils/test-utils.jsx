import { render } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider } from "react-redux"
import { makeStore } from "../app/store"

/**
 * Renders the given React element with Redux Provider and custom store.
 * This function is useful for testing components that are connected to the Redux store.
 *
 * @param ui - The React component or element to render.
 * @param extendedRenderOptions - Optional configuration options for rendering. This includes `preloadedState` for initial Redux state and `store` for a specific Redux store instance. Any additional properties are passed to React Testing Library's render function.
 * @returns An object containing the Redux store used in the render, User event API for simulating user interactions in tests, and all of React Testing Library's query functions for testing the component.
 */
export const renderWithProviders = (ui, extendedRenderOptions = {}) => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(preloadedState),
    userEventOptions,
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(userEventOptions),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
