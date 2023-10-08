import { TransactionCard } from '@/components/transaction-card';
import { Input } from '@/components/ui/input';
import { transactions } from '@/public/data';
import { Bookmark, Settings } from 'lucide-react';

export default function Transactions() {
  return (
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
  )
}
