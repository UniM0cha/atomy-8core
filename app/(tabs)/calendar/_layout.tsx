import { Stack } from 'expo-router';

export default function CalendarLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '캘린더' }} />
      <Stack.Screen name="cores/index" options={{ title: '습관 목록' }} />
      <Stack.Screen name="cores/[core]" options={{ title: '습관 상세' }} />
    </Stack>
  );
}
