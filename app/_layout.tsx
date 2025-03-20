import { Stack } from 'expo-router';
import { SyncProvider } from '@/context/SyncContext';
import SyncScheduler from '@/component/SyncScheduler';
import QueryClientProvider from '@/context/QueryClientProvider';

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <SyncProvider>
        <SyncScheduler />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: '탭', headerShown: false }} />
        </Stack>
      </SyncProvider>
    </QueryClientProvider>
  );
}
