'use client'
import { PiggyBank, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useBalanceStore, useTransactionStore } from '@/app/store';
import { useEffect, useState } from 'react';
const calculateTotaBills = (transactions: any, balance: any) => {
  const totalBills = transactions.reduce((total: number, transaction: any) => {
    if (transaction.type) {
      return total + transaction.amount
    }
    return total
  }, 0)
  const totalRecieved = transactions.reduce((total: number, transaction: any) => {
    if (!transaction.type) {
      return total + transaction.amount
    }
    return total
  }, 0)
  return balance - totalBills + totalRecieved
}
const calculateTotaSavings = (transactions: any) => {
  const totalSavings = transactions.reduce((total: number, transaction: any) => {
    if (transaction.title === 'Savings') {
      return total + transaction.amount
    }
    return total
  }, 0)
  return totalSavings
}
export const calculateTotalLeft = (transactions: any, balance: any) => {
  const totalDept = transactions.reduce((total: number, transaction: any) => {
    if (!transaction.isUpcoming && transaction.type) {

      return total + transaction.amount
    }
    return total
  }, 0)
  return balance - totalDept
}

export default function Income() {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const balance = useBalanceStore((state) => state.balance)

  const transactions = useTransactionStore((state) => state.transaction)
  return (
    <div className='w-full text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
      <h1>Wallet</h1>
      <div className='p-6 rounded border grid grid-cols-2 mt-4 relative'>
        <Button className='w-8 h-8 absolute top-2 left-2 right-auto lg:right-2 lg:left-auto rounded-md cursor-pointer bg-transparent text-slate-800 hover:bg-transparent hover:text-slate-950 p-2'>
          <RefreshCcw className="w-4 h-4" />
        </Button>
        <div className='flex items-center justify-center border-r'>
          <div className='flex flex-col justify-around'>
            <p className='text-base font-light'>
              Total balance
            </p>
            <div className='flex items-end justify-start'>
              {domLoaded && <p className='text-4xl sm:text-5xl font-bold mr-1'>
                {calculateTotaBills(transactions, balance.income).toLocaleString()}
              </p>}
              <p className='text-base font-light'>
                DH
              </p>
            </div>
            <div className='flex items-end justify-start'>
              {domLoaded && <p className='text-xs font-bold mr-1'>
                {transactions.length}
              </p>}
              <p className='text-xs text-slate-600 font-light'>
                Transactions
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-center pl-3 flex-col'>
          <div className='flex flex-col justify-around mb-4'>
            <div className='flex items-center'>
              <div className="w-5 h-5 flex items-center rounded-md justify-center mr-2 bg-green-600" >
                <RefreshCcw className="w-3 h-3 text-white" />
              </div>
              <p className='text-xs font-light'>
                Monthly Income
              </p>
            </div>
            <div className='flex items-end justify-start'>
              {domLoaded && <p className='text-2xl font-bold mr-1'>
                {balance.income.toLocaleString()}
              </p>}
              <p className='text-base font-light'>
                DH
              </p>
            </div>

          </div>
          <div className='flex flex-col justify-around mb-4'>
            <div className='flex items-center'>
              <div className="w-5 h-5 flex items-center rounded-md justify-center mr-2 bg-red-400" >
                <RefreshCcw className="w-3 h-3 text-white" />
              </div>
              <p className='text-xs font-light'>
                Without Upcoming
              </p>
            </div>
            <div className='flex items-end justify-start'>
              {domLoaded && <p className='text-2xl font-bold mr-1'>
                {calculateTotalLeft(transactions, balance.income).toLocaleString()}
              </p>}
              <p className='text-base font-light'>
                DH
              </p>
            </div>

          </div>
          <div className='flex flex-col justify-around'>

            <div className='flex items-center'>
              <div className="w-5 h-5 flex items-center rounded-md justify-center mr-2 bg-sky-500" >
                <PiggyBank className="w-3 h-3 text-white" />
              </div>
              <p className='text-xs font-light'>
                Savings
              </p>
            </div>
            <div className='flex items-end justify-start'>
              {domLoaded && <p className='text-2xl font-bold mr-1'>
                {calculateTotaSavings(transactions).toLocaleString()}
              </p>}
              <p className='text-base font-light'>
                DH
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}