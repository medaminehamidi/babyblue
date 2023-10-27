'use client'
import { useTransactionStore } from '@/app/store';
import { BillCard } from '@/components/bill-card';
import { bills } from '@/public/data';
import { useEffect, useState } from 'react';

function filterBills(transactions: any) {
  return transactions.filter((transaction: any) => transaction.isUpcoming);
}


export default function Bills() {
  const transactions = useTransactionStore((state) => state.transaction)
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const billsArray = filterBills(transactions);
  return (
    <div className='text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
      <h1 className='mb-4'>Upcoming Transactions</h1>
      <div className='grid-cols-6 grid gap-2 items-center w-full'>
        {domLoaded && billsArray.map((item: any, key: any) => <BillCard sent={item.type} title={item.description} amount={item.amount} key={key} />)}
      </div>
    </div>
  )
}
