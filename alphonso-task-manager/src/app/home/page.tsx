'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { buttonState, tasks } from '../../utils/constants';
import { Button } from '../../components/ui/button';
import TaskComp from '../../components/TaskComp/TaskComp';
import React, { useState } from 'react';
import { useAppContext } from '../../helpers/contexts/TaskContext';

export default function Home() {
  const [state, setState] = useState('All');
  const [taskName, setTaskName] = useState('');
  const {
    allTasks,
    completedTasks,
    incompleteTasks,
    updateAllTasks,
    updateCompletedTasks,
    updateIncompleteTasks,
  } = useAppContext();

  const renderList =
    state === 'All'
      ? allTasks
      : state === 'Completed'
      ? completedTasks
      : incompleteTasks;

  const handleAddTask = () => {
    if (!allTasks.includes(taskName)) {
      updateAllTasks([...allTasks, taskName]);
    }
    setTaskName('');
  };

  return (
    <div className="flex flex-col justify-center p-10 gap-4 w-full">
      <div className="flex flex-col md:flex-row justify-center gap-2 w-full">
        <div className="flex text-2xl font-bold">Today</div>
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="🔍   Search"
            className="flex w-full"
          />
          <div className="flex gap-2">
            {buttonState.map((val) => {
              return (
                <div key={val.state}>
                  <Button
                    variant={state === val.state ? 'destructive' : 'outline'}
                    onClick={() => setState(val.state)}
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
        {renderList.map((val) => {
          return (
            <TaskComp
              title={val}
              key={val}
              isChecked={completedTasks.includes(val)}
              onPress={() => {
                if (completedTasks.includes(val)) {
                  updateCompletedTasks([
                    ...completedTasks.filter((curr) => curr !== val),
                  ]);
                  updateIncompleteTasks([...incompleteTasks, val]);
                } else {
                  updateCompletedTasks([...completedTasks, val]);
                  updateIncompleteTasks([
                    ...incompleteTasks.filter((curr) => curr !== val),
                  ]);
                }
              }}
              onClose={() => {
                updateAllTasks([...allTasks.filter((curr) => curr !== val)]);
                updateCompletedTasks([
                  ...completedTasks.filter((curr) => curr !== val),
                ]);
                updateIncompleteTasks([
                  ...incompleteTasks.filter((curr) => curr !== val),
                ]);
              }}
            />
          );
        })}
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
