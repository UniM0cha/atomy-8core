import React, { createContext, ReactNode, useContext, useState } from 'react';

class SyncValue {
  syncing: boolean = true;
  useSync: boolean = false;
}

interface SyncState {
  sync: SyncValue;
  setSync: (sync: SyncValue) => void;
}

const SyncContext = createContext<SyncState | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [sync, setSync] = useState(new SyncValue());
  return <SyncContext.Provider value={{ sync, setSync }}>{children}</SyncContext.Provider>;
}

export const useSyncState = (): SyncState => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
