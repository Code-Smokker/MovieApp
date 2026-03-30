import './global.css';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (
    <AppNavigation />
  );
}

registerRootComponent(App);
