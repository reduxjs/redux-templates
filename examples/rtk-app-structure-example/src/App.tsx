import type { JSX } from "react"
import "./App.css"
import { Counter } from "./features/counter/Counter"
import logo from "./logo.svg"

export const App = (): JSX.Element => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <span>
        <span>Learn </span>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <span> and </span>
        <a
          className="App-link"
          href="https://redux.js.org/tutorials/essentials/part-2-app-structure"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux
        </a>
      </span>
    </header>
  </div>
)
