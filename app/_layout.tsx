import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlaybackProvider } from "@/contexts/PlaybackContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlaybackProvider>
        <StatusBar hidden />
        <Stack
          screenOptions={{
            animation: "none",
            contentStyle: { backgroundColor: "black" },
            headerShown: false,
          }}
        />
      </PlaybackProvider>
    </GestureHandlerRootView>
  );
}
