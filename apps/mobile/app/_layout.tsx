import { Stack } from 'expo-router';
import { useFonts, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync().catch(() => {
  /* Splash may already be hidden in some environments (e.g. tests). */
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_800ExtraBold,
  });

  const fontsReady = fontsLoaded || fontError != null;

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsReady]);

  // Keep the splash visible while fonts load. On failure, continue with system fonts
  // so the app never stays on a permanent blank screen.
  if (!fontsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
