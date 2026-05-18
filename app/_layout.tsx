import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { DictionaryProvider } from "../src/state/context";
import { ThemeProvider } from "../src/theme/ThemeContext";
import SplashScreen from "../src/components/SplashScreen";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    import("../src/core/dictionaryService").then((mod) => {
      setWordCount(mod.wordsLoaded);
    });
  }, []);

  if (!ready) {
    return (
      <SplashScreen
        wordCount={wordCount}
        onFinish={() => setReady(true)}
      />
    );
  }

  return (
    <ThemeProvider>
      <DictionaryProvider>
        <Stack>
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
      </DictionaryProvider>
    </ThemeProvider>
  );
}
