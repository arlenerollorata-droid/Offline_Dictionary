import AsyncStorage from "@react-native-async-storage/async-storage";
import { DictionaryState } from "../state/types";

const STORAGE_KEY = "offline_dictionary_state";

export async function saveState(state: DictionaryState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function loadState(): Promise<Partial<DictionaryState> | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Partial<DictionaryState>;
  } catch {
    return null;
  }
}
