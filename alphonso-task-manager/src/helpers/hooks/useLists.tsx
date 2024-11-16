import { useState } from 'react';
import { useAppContext } from '../contexts/TaskContext';

export const useLists = () => {
  const [currListState, setCurrListState] = useState('All');
  const [taskName, setTaskName] = useState('');

  const {
    allTasks,
    completedTasks,
    incompleteTasks,
    updateAllTasks,
    updateCompletedTasks,
    updateIncompleteTasks,
  } = useAppContext();
  const getIsChecked = (val: string) => {
    return completedTasks.includes(val);
  };

  const handleSwitch = (val: string) => {
    if (completedTasks.includes(val)) {
      updateCompletedTasks([...completedTasks.filter((curr) => curr !== val)]);
      updateIncompleteTasks([...incompleteTasks, val]);
    } else {
      updateCompletedTasks([...completedTasks, val]);
      updateIncompleteTasks([
        ...incompleteTasks.filter((curr) => curr !== val),
      ]);
    }
  };

  const handleDeleteTask = (val: string) => {
    updateAllTasks([...allTasks.filter((curr) => curr !== val)]);
    updateCompletedTasks([...completedTasks.filter((curr) => curr !== val)]);
    updateIncompleteTasks([...incompleteTasks.filter((curr) => curr !== val)]);
  };

  const handleAddTask = () => {
    if (!allTasks.includes(taskName)) {
      updateAllTasks([...allTasks, taskName]);
    }
    if (currListState === 'Completed') {
      updateCompletedTasks([...completedTasks, taskName]);
    } else {
      updateIncompleteTasks([...incompleteTasks, taskName]);
    }
    setTaskName('');
  };

  const getCurrStateList = () => {
    const renderList =
      currListState === 'All'
        ? allTasks
        : currListState === 'Completed'
        ? completedTasks
        : incompleteTasks;

    return renderList;
  };

  return {
    getCurrStateList,
    handleAddTask,
    handleSwitch,
    handleDeleteTask,
    getIsChecked,
    currListState,
    setCurrListState,
    taskName,
    setTaskName,
  };
};
