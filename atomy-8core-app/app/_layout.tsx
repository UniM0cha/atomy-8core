import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: "캘린더", headerShown: false }} />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
