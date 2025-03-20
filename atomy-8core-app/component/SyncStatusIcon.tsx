import { useSyncState } from '@/context/SyncContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SyncStatusIcon() {
  const {
    sync: { syncing, useSync },
  } = useSyncState();

  if (!useSync) {
    return null;
  }

  const syncingIcon = <MaterialCommunityIcons name="cloud-sync-outline" size={24} />;
  const syncingCompleteIcon = <MaterialCommunityIcons name="cloud-check-outline" size={24} />;

  return syncing ? syncingIcon : syncingCompleteIcon;
}
