import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import GameContextProvider from "../context/context";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name={colorScheme}>
          <ThemeProvider
            value={colorScheme === "light" ? DefaultTheme : DarkTheme}
          >
            <MySafeAreaView>
              <StatusBar
                backgroundColor={colorScheme === "light" ? "#fff" : "#111111"}
                style="auto"
              />
              <GameContextProvider>
                <Stack
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen name="tabs" />
                  <Stack.Screen
                    getId={({ params }) => params.id}
                    name="game/[id]"
                  />
                  <Stack.Screen
                    getId={({ params }) => params.id}
                    name="browseGames/[id]"
                  />
                </Stack>
              </GameContextProvider>
            </MySafeAreaView>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  );
}
