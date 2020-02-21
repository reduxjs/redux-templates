import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
      // mutate the state because it uses the immer library, which detects
      // changes to a "draft state" and produces a brand new immutable state
      // based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<{ amount: number }>) => {
      state.value += action.payload.amount;
    },
  },
});

export type State = ReturnType<typeof slice.reducer>;

export const selectCount = (state: { counter: State }) => state.counter.value;
export const { increment, decrement, incrementByAmount } = slice.actions;

export default slice.reducer;
