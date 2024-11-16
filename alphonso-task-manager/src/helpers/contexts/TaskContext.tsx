'use client';
import { tasks } from '../../utils/constants';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface AppContextType {
  allTasks: string[];
  completedTasks: string[];
  incompleteTasks: string[];
  updateAllTasks: (newData: string[]) => void;
  updateCompletedTasks: (newData: string[]) => void;
  updateIncompleteTasks: (newData: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== 'undefined';

  const [allTasks, setAllTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<string[]>([]);

  useEffect(() => {
    if (isBrowser) {
      const storedAllTasks = localStorage.getItem('allTasks');
      const storedCompletedTasks = localStorage.getItem('completedTasks');
      const storedIncompleteTasks = localStorage.getItem('incompleteTasks');

      setAllTasks(storedAllTasks ? JSON.parse(storedAllTasks) : tasks);
      setCompletedTasks(
        storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [],
      );
      setIncompleteTasks(
        storedIncompleteTasks ? JSON.parse(storedIncompleteTasks) : tasks,
      );
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('allTasks', JSON.stringify(allTasks));
    }
  }, [allTasks]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  }, [completedTasks]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks));
    }
  }, [incompleteTasks]);

  const updateAllTasks = (newData: string[]) => {
    setAllTasks(newData);
  };

  const updateCompletedTasks = (newData: string[]) => {
    setCompletedTasks(newData);
  };

  const updateIncompleteTasks = (newData: string[]) => {
    setIncompleteTasks(newData);
  };

  return (
    <AppContext.Provider
      value={{
        allTasks,
        completedTasks,
        incompleteTasks,
        updateAllTasks,
        updateCompletedTasks,
        updateIncompleteTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
