/**
 * Store Template
 * 
 * Follows: docs/rules/state-management.md
 * - Type-safe state
 * - Immutable updates
 * - Proper state structure
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define state interface
interface StoreState {
  // Define your state properties
  data: string | null;
  loading: boolean;
  error: string | null;
}

// Define context type
interface StoreContextType extends StoreState {
  // Define actions
  setData: (data: string) => void;
  clearData: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Provider component
interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, setState] = useState<StoreState>({
    data: null,
    loading: false,
    error: null,
  });

  // Immutable state updates
  const setData = useCallback((data: string) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const clearData = useCallback(() => {
    setState(prev => ({ ...prev, data: null }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const value: StoreContextType = {
    ...state,
    setData,
    clearData,
    setLoading,
    setError,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

