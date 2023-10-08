import { InfoCard } from '@/components/info-card';
import { amounts, extraInfos } from '@/public/data';
import { HelpCircle, PenSquare } from 'lucide-react';


export default function Income() {
  return (
    <div className='w-full text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
      <h1>Total Income</h1>
      <div className='w-full mt-6 grid grid-cols-4 md:flex md:items-center md:justify-between'>
        {amounts.map((item, key) => <InfoCard title={item.title} amount={item.amount} key={key} />)}
      </div>
      <div className='w-full grid grid-cols-2 lg:flex mt-6 items-center rounded-md bg-gray-100 p-4'>
        <div className='flex col-span-2 lg:col-span-1 items-center justify-around w-full'>
          {extraInfos.map((item, key) => <InfoCard title={item.title} amount={item.amount} key={key} />)}
        </div>
        <div className='flex col-span-2 mt-4 lg:mt-0 lg:col-span-1 items-center justify-between lg:justify-end w-full'>
          <div className='rounded-md flex items-center ml-0 lg:ml-10 cursor-pointer justify-center w-14 h-14 bg-white '>
            <HelpCircle />
          </div>
          <div className='rounded-md flex items-center justify-around cursor-pointer ml-4 w-24 text-sm h-14 bg-black text-white'>
            <PenSquare />
            <p>Edit</p>
          </div>
        </div>
      </div>
    </div>
  )
}
