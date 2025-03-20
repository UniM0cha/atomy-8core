import { Stack } from 'expo-router';

export default function HabitLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: '습관 상세',
          headerBackTitle: '뒤로',
        }}
      />
    </Stack>
  );
}
