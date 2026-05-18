import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View, useColorScheme } from "react-native";

type Props = {
  onFinish: () => void;
  wordCount: number;
  themeMode?: "light" | "dark" | null;
};

export default function SplashScreen({ onFinish, wordCount, themeMode }: Props) {
  const systemScheme = useColorScheme();
  const dark = themeMode ? themeMode === "dark" : systemScheme === "dark";
  const bg = dark ? "#0a0a0a" : "#fff";
  const fg = dark ? "#f5f5f5" : "#1a1a1a";
  const mg = dark ? "#9ca3af" : "#6b7280";
  const accent = dark ? "#C62828" : "#7B1818";
  const accentBg = dark ? "rgba(198,40,40,0.12)" : "rgba(123,24,24,0.08)";
  const track = dark ? "#262626" : "#f3f4f6";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

    pulse(dot1, 0).start();
    pulse(dot2, 200).start();
    pulse(dot3, 400).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[styles.container, { opacity: containerOpacity, backgroundColor: bg }]}
    >
      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.iconWrap, { backgroundColor: accentBg }]}>
          <Ionicons name="book" size={44} color={accent} />
        </View>

        <Text style={[styles.title, { color: fg }]}>Offline Dictionary</Text>
        <Text style={[styles.subtitle, { color: mg }]}>with Trie Search</Text>

        <View style={[styles.divider, { backgroundColor: accent }]} />

        <View style={styles.dots}>
          {[dot1, dot2, dot3].map((dot, i) => (
            <Animated.View
              key={i}
              style={[styles.dot, { opacity: dot, backgroundColor: accent }]}
            />
          ))}
        </View>

        <Text style={[styles.loadingText, { color: mg }]}>
          Loading {wordCount.toLocaleString()} words...
        </Text>

        <View style={[styles.progressTrack, { backgroundColor: track }]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: accent,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 4,
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginVertical: 24,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 12,
  },
  progressTrack: {
    width: 200,
    height: 3,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
});
