// src/components/GridToggle.js
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const GridToggle = ({ isGrid, toggleView }) => (
  <View style={styles.toggle}>
    <Button title={isGrid ? 'Switch to List' : 'Switch to Grid'} onPress={toggleView} />
  </View>
);

const styles = StyleSheet.create({
  toggle: { paddingHorizontal: 10, marginVertical: 8 },
});

export default GridToggle;
