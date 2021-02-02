import counter from './counterSlice'

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(counter(undefined, {})).toEqual({value: 0})
  })

  it('should handle increment', () => {
    expect(
      counter({ value: 3 }, {
        type: 'counter/increment',
      })
    ).toEqual({ value: 4 });
  });

})