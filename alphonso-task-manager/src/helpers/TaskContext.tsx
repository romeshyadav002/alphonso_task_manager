'use client';
import { createContext } from 'react';
import { tasks } from '../utils/constants';

const TaskContext = createContext({
  All: tasks,
  Completed: [],
  Incomplete: [],
});

export default TaskContext;
