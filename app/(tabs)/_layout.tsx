import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="calendar"
        options={{
          title: '캘린더',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="calendar-month" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '통계',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="bar-chart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
