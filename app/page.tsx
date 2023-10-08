import { BillCard } from '@/components/bill-card';
import { InfoCard } from '@/components/info-card';
import { TransactionCard } from '@/components/transaction-card';
import { Input } from '@/components/ui/input';
import { amounts, bills, extraInfos, transactions } from '@/public/data';
import { Bookmark, HelpCircle, PenSquare, Settings } from 'lucide-react';


export default function Home() {
  return (
    <div className='grid h-24 grid-cols-6'>
      <div className='w-full text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
        <h1>MasterCard Gold</h1>
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
      <div className='text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
        <h1 className='mb-4'>Upcoming Bills</h1>
        <div className='grid-cols-6 grid gap-2 items-center w-full'>
          {bills.map((item, key) => <BillCard title={item.title} amount={item.amount} key={key} Icon={item.icon} />)}
        </div>
      </div>
      <div className='w-full text-2xl font-bold col-span-6 px-6 pt-6'>
        <h1>Transactions</h1>
        <div className='w-full flex items-center justify-between mt-4'>
          <Input placeholder='Filtet Items...' className='w-[120px] xs:w-[320px]' />
          <div className='rounded-md cursor-pointer bg-black text-white p-2'>
            <Settings />
          </div>
        </div>
        <div>
          {transactions.map((item, key) => <TransactionCard title={item.title} amount={item.amount} key={key} type={item.type} date={item.date} description={item.description} index={key.toString()} />)}
        </div>
        <div className='flex mt-4 mb-20 items-center'>
          <div className='rounded-md mr-4 bg-black text-white w-7 flex items-center justify-center h-7'>
            <Bookmark className='w-4 h-4' />
          </div>
          <p className='text-xs text-gray-600 font-light'>you have 1500 DH remaining funds over the next 23 days</p>
        </div>
      </div>
    </div>

  )
}
