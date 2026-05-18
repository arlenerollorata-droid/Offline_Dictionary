import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "../../src/theme/ThemeContext";

export default function TabLayout() {
  const t = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Link asChild href="/settings">
            <Pressable style={{ marginRight: 16, padding: 4 }}>
              <Ionicons name="settings-outline" size={22} color={t.accent} />
            </Pressable>
          </Link>
        ),
        headerStyle: { backgroundColor: t.bg },
        headerTitleStyle: { fontWeight: "700", color: t.text },
        headerShadowVisible: false,
        tabBarActiveTintColor: t.accent,
        tabBarInactiveTintColor: t.textSubtle,
        tabBarStyle: {
          backgroundColor: t.card,
          borderTopColor: t.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 11,
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
