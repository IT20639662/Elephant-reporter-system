import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import axios from 'axios';

export default function Prediction() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', {
        date,
        time,
        weather,
        season,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Time (HH:MM):</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Weather:</Text>
      <TextInput
        style={styles.input}
        value={weather}
        onChangeText={setWeather}
      />

      <Text style={styles.label}>Season:</Text>
      <TextInput
        style={styles.input}
        value={season}
        onChangeText={setSeason}
      />

      <Button title="Predict" onPress={handlePredict} />

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Predicted Venue:</Text>
          <Text style={styles.resultValue}>{result.predicted_venue}</Text>

          <Text style={styles.resultLabel}>Probabilities:</Text>
          {Object.entries(result.probabilities).map(([venue, prob]) => (
            <Text key={venue} style={styles.resultValue}>{`${venue}: ${(prob * 100).toFixed(2)}%`}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 16,
    marginTop: 4,
  },
});
