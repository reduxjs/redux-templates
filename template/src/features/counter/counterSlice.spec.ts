import counterReducer, {
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from './counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});

describe('counter reducer async actions', () => {
  const initialState: CounterState = {
    value: 5,
    status: 'idle',
  };
  it('should set status to "loading"', async () => {
    const action = { type: incrementAsync.pending.type };
    const state = counterReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should set status to "idle"', async () => {
    const amount = 2;
    const action = { type: incrementAsync.fulfilled.type, payload: amount };
    const state = counterReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      value: initialState.value + amount,
      status: 'idle',
    });
  });
});
