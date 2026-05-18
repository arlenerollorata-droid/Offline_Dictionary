import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function TabLayout() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Link asChild href="/settings">
            <Pressable style={{ marginRight: 16, padding: 4 }}>
              <Ionicons name="settings-outline" size={22} color={t.white} />
            </Pressable>
          </Link>
        ),
        headerStyle: { backgroundColor: t.headerBg },
        headerTitleStyle: { fontWeight: "700", color: "#fff" },
        headerShadowVisible: false,
        tabBarActiveTintColor: t.accent,
        tabBarInactiveTintColor: t.textSubtle,
        tabBarStyle: {
          backgroundColor: t.card,
          borderTopColor: t.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 11,
          marginTop: 2,
        },
        tabBarItemStyle: {
          gap: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
