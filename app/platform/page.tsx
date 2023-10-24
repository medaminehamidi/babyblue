'use client'
import Monthlytrans from "@/components/monthly-trans";
import { AlertOctagon } from "lucide-react";
import { useBalanceStore, useTransactionStore } from "../store";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
const calculateTotalTransactions = (transactions: any) => {
  const totalBills = transactions.reduce((total: number, transaction: any) => {
    
    return total + transaction.amount
  }, 0)
  return totalBills
}
export default function Home() {
  const [first, setFirst] = useState(0)
  
  
  const balance = useBalanceStore((state) => state.balance)
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const transactions = useTransactionStore((state) => state.transaction)
  const value = calculateTotalTransactions(transactions)
const perce = (value/balance.income*100)
console.warn(perce)
useEffect(() => {
  if(balance && balance.income && transactions.length) {
    setFirst((value/balance.income*100))
  }

 
}, [domLoaded])
  return (
    <div className="w-full grid grid-cols-5">
      <div className="col-span-3 border-r border-black p-6">
        <div>
          <h1 className="text-2xl">Transactions</h1>
        </div>
        <Monthlytrans month={new Date} />
        <Monthlytrans month={new Date} />
        <Monthlytrans month={new Date} />
        <Monthlytrans month={new Date} />
        <Monthlytrans month={new Date} />

      </div>
      <div className="col-span-2 p-6">
        <h1 className="text-2xl">Spending Limits</h1>
        <div className="mt-4 w-full">
          <p className="text-sm text-gray-600">Monthly Transaction Limit</p>
          {domLoaded && <div className="flex items-end mt-2">
            <p className="font-bold text-lg leading-5">{calculateTotalTransactions(transactions)} DH</p>
            <p className="text-sm text-gray-600 ml-1">of {balance.income} DH</p>
          </div>}
          <div className="w-full flex items-center mt-2 justify-between">
          { <Progress value={first} className="w-[80%] h-2"/>}

            {domLoaded &&<p className="text-sm">{(calculateTotalTransactions(transactions)/balance.income*100).toFixed(0)}%</p>}
          </div>
          <div className="flex items-center mt-2">
            <AlertOctagon className="w-4 h-4 text-red-600"/>
            <p className="text-xs ml-2 text-red-600">Your spending limit has almost reached the limit!</p>
          </div>
        </div>
      </div>
    </div>



  )
}