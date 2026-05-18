import { Stack } from "expo-router";
import { DictionaryProvider } from "../src/state/context";

export default function RootLayout() {
  return (
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
  );
}
