import { Provider } from "react-redux"
import { store } from "./src/app/store"

import { Main } from "./src/Main"

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App
