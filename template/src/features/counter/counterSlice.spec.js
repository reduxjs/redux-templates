import counter from './counterSlice'

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(counter(undefined, {})).toEqual({value: 0})
  })
})