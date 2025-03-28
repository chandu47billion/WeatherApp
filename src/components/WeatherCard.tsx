import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
};

const WeatherCard = ({ city, temperature, condition, icon }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temp}>{temperature}°C</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  city: { fontSize: 20, fontWeight: 'bold' },
  temp: { fontSize: 36, fontWeight: '600', marginVertical: 10 },
  condition: { fontSize: 18, color: '#666' },
  icon: { width: 100, height: 100, marginTop: 10 },
});

export default WeatherCard;
