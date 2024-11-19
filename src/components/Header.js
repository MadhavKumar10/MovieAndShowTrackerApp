// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ title, onProfilePress, onMenuPress }) => (
  <View style={styles.container}>
    <TouchableOpacity  onPress={onMenuPress}>
     <Text style={styles.title}>☰</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Cinemas</Text>
    <TouchableOpacity onPress={onProfilePress}>
      <Text style={styles.title}>👤</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: 'white' },
  title: { fontSize: 20, color: 'black', fontWeight: 'bold'},
});

export default Header;
