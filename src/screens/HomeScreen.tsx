import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather, loadLastCity } from '../redux/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import WeatherCard from '../components/WeatherCard';
import { toggleTheme } from '../redux/themeSlice';
import { lightColors, darkColors } from '../theme/colors';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen = () => {
  const [cityInput, setCityInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const { city, temperature, condition, icon, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const theme = useSelector((state: RootState) => state.theme.mode);
  const colors = theme === 'dark' ? darkColors : lightColors;

  const handleSearch = async () => {
    if (cityInput.trim() === '') return;
  
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert('No internet connection');
      return;
    }
  
    dispatch(getWeather(cityInput));
  };

  useEffect(() => {
    dispatch(loadLastCity());
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Weather App</Text>

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
        placeholder="Enter city"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={cityInput}
        onChangeText={setCityInput}
      />

      <Button title="Get Weather" onPress={handleSearch} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Toggle Theme" onPress={() => dispatch(toggleTheme())} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

      {temperature !== null && !loading && !error && (
        <WeatherCard
          city={city}
          temperature={temperature}
          condition={condition}
          icon={icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  error: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
