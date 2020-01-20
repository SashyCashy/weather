/**
 * ---------------------------------------------------------------------------------------------
 * Component : Weather App
 * Purpose : This component is used to bind all the components that are necessary for the weather app functionality
 * Author(s) : Sashank Pindiproli
 * ---------------------------------------------------------------------------------------------
 */
import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import SearchInput from './components/SearchInput';

import getImageForWeather from './utils/getImageForWeather';

import { fetchLocationId, fetchWeather } from './utils/api';

export default function App() {
  const [location, setLocation] = useState('San Francisco');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState('Light Cloud');
  const [temperature, setTemperature] = useState('24');
  const handleUpdateLocation = async city => {
    if (!city) return;
    setLoading(true);
    try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationId);
      setLoading(false);
      setError(false);
      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  useMemo(() => {
    handleUpdateLocation(location);
  }, [location]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator
            style={styles.loadingContainer}
            animating={loading}
            color="white"
            size="large"
          />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {' '}
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {' '}
                    {Math.round(temperature)}˚C
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                location={location}
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 40
  },
  loadingContainer: {
    justifyContent: 'center',
    width: 340,
    paddingHorizontal: 40
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular'
      },
      amdroid: {
        fontFamily: 'Roboto'
      }
    })
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
