import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { buttonState, tasks } from '../../utils/constants';
import { Button } from '../../components/ui/button';
import TaskComp from '../../components/TaskComp/TaskComp';

export default function Home() {
  return (
    <div className="flex flex-col justify-center p-10 gap-4 w-full">
      <div className="flex flex-col md:flex-row justify-center gap-2 w-full">
        <div className="flex text-2xl font-bold">Today</div>
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="email"
            placeholder="🔍   Search"
            className="flex w-full"
          />
          <div className="flex gap-2">
            {buttonState.map((val) => {
              return (
                <>
                  <Button variant="outline">{val.state}</Button>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((val) => {
          return <TaskComp title={val} />;
        })}
      </div>

      <div className="flex flex-col gap-4">
        <Input type="email" placeholder="Type something" />
        <Button>Add Task</Button>
      </div>
    </div>
  );
}
