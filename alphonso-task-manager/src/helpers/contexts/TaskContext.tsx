'use client';
import { tasks } from '../../utils/constants';
import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  const [allTasks, setAllTasks] = useState<string[]>(tasks);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<string[]>(tasks);
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
