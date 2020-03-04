import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value;

export const { increment, decrement, incrementByAmount } = slice.actions;

export const incrementAsync = (): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

export default slice.reducer;
