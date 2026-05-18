import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { DictionaryProvider } from "../src/state/context";
import { ThemeProvider, useTheme } from "../src/theme/ThemeContext";
import SplashScreen from "../src/components/SplashScreen";

function RootNavigator() {
  const t = useTheme();
  return (
    <>
      <StatusBar style="light" backgroundColor={t.headerBg} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: t.headerBg },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700", color: "#fff" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="word/[word]" options={{ title: "Word Detail" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen
          name="modal"
          options={{
            title: "Advanced Search",
            presentation: "modal"
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [splashTheme, setSplashTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    import("../src/core/dictionaryService").then((mod) => {
      setWordCount(mod.wordsLoaded);
    });
    AsyncStorage.getItem("@dictionary_theme_mode").then((v) => {
      if (v === "light" || v === "dark") setSplashTheme(v);
    });
  }, []);

  if (!ready) {
    return (
      <SplashScreen
        wordCount={wordCount}
        themeMode={splashTheme}
        onFinish={() => setReady(true)}
      />
    );
  }

  return (
    <ThemeProvider>
      <DictionaryProvider>
        <RootNavigator />
      </DictionaryProvider>
    </ThemeProvider>
  );
}
