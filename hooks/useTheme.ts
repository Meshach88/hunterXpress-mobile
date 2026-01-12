import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

export function useTheme() {
  const systemTheme = useColorScheme(); // light | dark
//   const mode = useSelector((state: any) => state.theme.mode) ?? 'light';
  const mode = 'light';

  if (mode === 'light') {
    return systemTheme ?? 'light';
  }

  return mode;
}
