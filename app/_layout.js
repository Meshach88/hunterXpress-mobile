// app/_layout.js
import { useEffect, useState } from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@/hooks/useTheme';
import { Stack, Redirect, useSegments } from 'expo-router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { store, useAppDispatch, useAppSelector } from '../store';
import { restoreSession } from '../store/authSlice';
import { ActivityIndicator, View } from 'react-native';
import { loadToken } from '@/services/storage';

function Layout() {
  const theme = useTheme();
  const segments = useSegments();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await loadToken();
      if (token) {
        dispatch(restoreSession(token));
      }
      setHydrated(true);
    };

    bootstrap();
  }, []);

  if (!hydrated || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const inAuthGroup = segments.includes('(auth)');
  const inPublicGroup = segments.includes('(public)');

  // Not authenticated
  if (!isAuthenticated) {
    if (inPublicGroup || inAuthGroup) {
      return <Stack />;
    }
    return <Redirect href={{ pathname: '/(public)/welcome' }} />;
  }

  // Authenticated
  if (user) {
    switch (user.role) {
      case 'customer':
        if (!segments.includes('(customer-tabs)')) {
          return <Redirect href={{ pathname: '/(customer-tabs)/home' }} />;
        }
        break;

      case 'courier':
        if (!segments.includes('(courier-tabs)')) {
          return <Redirect href={{ pathname: '/(courier-tabs)/dashboard' }} />;
        }
        break;

      case 'admin':
        if (!segments.includes('(admin)')) {
          return <Redirect href={{ pathname: '/(admin)/dashboard' }} />;
        }
        break;

      default:
        return <Redirect href={{ pathname: '/(auth)/login' }} />;
    }
  }

  return <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack screenOptions={{ headerShown: false }} />
  </ThemeProvider>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
