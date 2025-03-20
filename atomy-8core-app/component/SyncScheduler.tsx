import { useSyncState } from '@/context/SyncContext';
import { useEffect } from 'react';
import { HabitStorage } from '@/storage/HabitStorage';

export default function SyncScheduler() {
  const { setSync } = useSyncState();

  useEffect(() => {
    HabitStorage.initialize();
  }, []);

  return null;
}
