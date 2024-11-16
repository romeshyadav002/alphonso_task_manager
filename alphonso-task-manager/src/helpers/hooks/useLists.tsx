import { useCallback, useEffect, useState } from 'react';
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

  const [searchTask, setSearchTask] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(getCurrStateList());

  const handleSearch = useCallback(
    debounce(() => {
      const currList = getCurrStateList();
      console.log({ currList });
      const filtered = currList.filter((task) =>
        task.toLowerCase().includes(searchTask.toLowerCase()),
      );
      console.log({ filtered });
      setFilteredTasks(filtered);
    }, 300),
    [currListState, allTasks, searchTask],
  );

  useEffect(() => {
    console.log('i am here', { currListState });
    handleSearch();
  }, [searchTask, currListState, allTasks]);

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
    searchTask,
    setSearchTask,
    filteredTasks,
    setFilteredTasks,
    handleSearch,
  };
};

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
