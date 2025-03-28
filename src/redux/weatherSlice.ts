import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../services/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeatherState {
  city: string;
  temperature: number | null;
  condition: string;
  icon: string;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: '',
  temperature: null,
  condition: '',
  icon: '',
  loading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    const data = await fetchWeather(city);
    await AsyncStorage.setItem('lastCity', city);
    return data;
  }
);

export const loadLastCity = createAsyncThunk(
  'weather/loadLastCity',
  async (_, thunkAPI) => {
    const lastCity = await AsyncStorage.getItem('lastCity');
    if (lastCity) {
      return thunkAPI.dispatch(getWeather(lastCity));
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.name;
        state.temperature = action.payload.main.temp;
        state.condition = action.payload.weather[0].main;
        state.icon = action.payload.weather[0].icon;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = 'City not found';
      });
  },
});

export default weatherSlice.reducer;
