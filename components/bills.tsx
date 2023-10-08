import { BillCard } from '@/components/bill-card';
import { bills } from '@/public/data';


export default function Bills() {
  return (
    <div className='text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
      <h1 className='mb-4'>Upcoming Bills</h1>
      <div className='grid-cols-6 grid gap-2 items-center w-full'>
        {bills.map((item, key) => <BillCard title={item.title} amount={item.amount} key={key} Icon={item.icon} />)}
      </div>
    </div>
  )
}
