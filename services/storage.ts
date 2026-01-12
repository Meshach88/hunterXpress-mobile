import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Theme Storage
 */
export const saveTheme = async (mode: string) => {
  try {
    await AsyncStorage.setItem('theme', mode);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
};

export const loadTheme = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('theme');
  } catch (error) {
    console.error('Failed to load theme:', error);
    return null;
  }
};

/**
 * Token Storage
 */
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

export const loadToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Failed to load token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};
