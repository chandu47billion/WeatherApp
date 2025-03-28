import weatherReducer, { getWeather } from '../src/redux/weatherSlice';

describe('weatherSlice reducer', () => {
  const initialState = {
    city: '',
    temperature: null,
    condition: '',
    icon: '',
    loading: false,
    error: null,
  };

  it('should handle pending state', () => {
    const action = { type: getWeather.pending.type };
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fulfilled state', () => {
    const action = {
      type: getWeather.fulfilled.type,
      payload: {
        name: 'Delhi',
        main: { temp: 30 },
        weather: [{ main: 'Sunny', icon: '01d' }],
      },
    };

    const state = weatherReducer(initialState, action);
    expect(state.city).toBe('Delhi');
    expect(state.temperature).toBe(30);
    expect(state.condition).toBe('Sunny');
    expect(state.icon).toBe('01d');
    expect(state.loading).toBe(false);
  });

  it('should handle rejected state', () => {
    const action = { type: getWeather.rejected.type };
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('City not found');
  });
});
