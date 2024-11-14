import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="">Today</div>
      <div className="flex flex-col md:flex-row">
        <Input type="email" placeholder="Email" />
      </div>
    </div>
  );
}
