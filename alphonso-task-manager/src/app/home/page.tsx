'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { buttonState } from '../../utils/constants';
import { Button } from '../../components/ui/button';
import TaskComp from '../../components/TaskComp/TaskComp';
import React from 'react';
import { useLists } from '../../helpers/hooks/useLists';

export default function Home() {
  const {
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
  } = useLists();

  return (
    <div className="flex flex-col justify-center p-10 gap-4 w-full">
      <div className="flex flex-col md:flex-row justify-center gap-2 w-full">
        <div className="flex text-2xl font-bold">Today</div>
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="🔍Search tasks..."
            className="flex w-full"
            value={searchTask}
            onChange={(e) => {
              setSearchTask(e.target.value);
            }}
          />

          <div className="flex gap-2">
            {buttonState.map((val) => {
              return (
                <div key={val.state}>
                  <Button
                    variant={
                      currListState === val.state ? 'destructive' : 'outline'
                    }
                    onClick={() => {
                      setCurrListState(val.state);
                      setSearchTask('');
                      setFilteredTasks(getCurrStateList());
                    }}
                  >
                    {val.state}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredTasks.map((val) => {
          return (
            <TaskComp
              title={val}
              key={val}
              isChecked={getIsChecked(val)}
              onPress={() => handleSwitch(val)}
              onClose={() => handleDeleteTask(val)}
              isSearched={val.toLowerCase() === searchTask.toLowerCase()}
            />
          );
        })}
        {filteredTasks.length === 0 && (
          <li className="text-gray-500">No tasks found.</li>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Type something"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button onClick={handleAddTask} disabled={taskName.length === 0}>
          Add Task
        </Button>
      </div>
    </div>
  );
}
