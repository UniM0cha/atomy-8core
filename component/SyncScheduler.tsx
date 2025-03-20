import { useSyncState } from '@/context/SyncContext';
import { useEffect } from 'react';
import { CoreStorage } from '@/storage/CoreStorage';

export default function SyncScheduler() {
  const { setSync } = useSyncState();

  useEffect(() => {
    CoreStorage.initialize();
  }, []);

  return null;
}
