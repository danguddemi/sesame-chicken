import React, { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMessage('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
    } else {
      _getLocationAsync();
    }
  }, []);

  return [location, errorMessage]
};

export default useGeoLocation;
