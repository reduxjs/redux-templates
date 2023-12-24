import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApi } from "../features/quotes/quotesAPI"

export const store = configureStore({
  reducer: {
    [counterSlice.reducerPath]: counterSlice.reducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(quotesApi.middleware)
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
