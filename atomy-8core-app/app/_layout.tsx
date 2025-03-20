import { Stack } from 'expo-router';
import { SyncProvider } from '@/context/SyncContext';
import SyncScheduler from '@/component/SyncScheduler';
import QueryClientProvider from '@/context/QueryClientProvider';
import SyncStatusIcon from '@/component/SyncStatusIcon';

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <SyncProvider>
        <SyncScheduler />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              title: '달력',
              headerRight: () => <SyncStatusIcon />,
            }}
          />
          <Stack.Screen name="detail" />
        </Stack>
      </SyncProvider>
    </QueryClientProvider>
  );
}
