import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/routes';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';


export default function App() {
  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true)
    return () => BackHandler.removeEventListener('backPress', () => true)
  }, [])
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}