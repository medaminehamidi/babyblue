'use client'
import Monthlytrans from "@/components/monthly-trans";
import { AlertOctagon } from "lucide-react";
import { useBalanceStore, useTransactionStore } from "../store";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";
import { useSupabase } from "@/components/SupabaseSessionProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";
const calculateTotalTransactions = (transactions: any) => {
  const totalBills = transactions.reduce((total: number, transaction: any) => {

    return total + transaction.amount
  }, 0)
  return totalBills
}
export default function Home() {
  const { user } = useSupabase()

  const [first, setFirst] = useState(0)
  useEffect(() => {
    if (!user) {
      redirect('/signin')
    }
  }, [user])

  const balance = useBalanceStore((state) => state.balance)
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const transactions = useTransactionStore((state) => state.transaction)
  const value = calculateTotalTransactions(transactions)
  useEffect(() => {
    if (balance && balance.income && transactions.length) {
      setFirst((value / balance.income * 100))
    }


  }, [domLoaded])
  const groupTransactions = (transactions: any) => {
    const groupedData: any = [];

    transactions.forEach((item: any) => {
      const month = moment(item.date).format("MMMM YYYY"); 
      const existingMonthIndex = groupedData.findIndex((group: any) => group.month === month);

      if (existingMonthIndex !== -1) {
        groupedData[existingMonthIndex].items.push(item);
      } else {
        groupedData.push({ month: month, items: [item] });
      }
    })
    console.warn(groupedData)
    return (groupedData)
  }

  return (
    <div>
      <Tabs defaultValue="transactions" className="w-full flex-col flex sm:hidden">
        <TabsList>
          <TabsTrigger className="w-full" value="transactions">Transactions</TabsTrigger>
          <TabsTrigger className="w-full" value="spendings">Spending Limits</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className=" border-r border-black p-6">
            <div>
              <h1 className="text-2xl">Transactions</h1>
            </div>
            {(domLoaded && transactions.length) && groupTransactions(transactions).map((data: any, key: any) => <Monthlytrans key={key} month={data.month} itemTransactions={data.items} />)}
          </div>
        </TabsContent>
        <TabsContent value="spendings">
          <div className="p-6">
            <h1 className="text-2xl">Spending Limits</h1>
            <div className="mt-4 w-full">
              <p className="text-sm text-gray-600">Monthly Transaction Limit</p>
              {domLoaded && <div className="flex items-end mt-2">
                <p className="font-bold text-lg leading-5">{calculateTotalTransactions(transactions)} DH</p>
                <p className="text-sm text-gray-600 ml-1">of {balance.income} DH</p>
              </div>}
              <div className="w-full flex items-center mt-2 justify-between">
                {<Progress value={first} className="w-[80%] h-2" />}

                {domLoaded && <p className="text-sm">{(calculateTotalTransactions(transactions) / balance.income * 100).toFixed(0)}%</p>}
              </div>
              <div className="flex items-center mt-2">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <p className="text-xs ml-2 text-red-600">Your spending limit has almost reached the limit!</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="w-full hidden  sm:grid grid-cols-5">
        <div className="col-span-3 border-r border-black p-6">
          <div>
            <h1 className="text-2xl">Transactions</h1>
          </div>
          {(domLoaded && transactions.length) && groupTransactions(transactions).map((data: any, key: any) => <Monthlytrans key={key} month={data.month} itemTransactions={data.items} />)}
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
              {<Progress value={first} className="w-[80%] h-2" />}

              {domLoaded && <p className="text-sm">{(calculateTotalTransactions(transactions) / balance.income * 100).toFixed(0)}%</p>}
            </div>
            <div className="flex items-center mt-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <p className="text-xs ml-2 text-red-600">Your spending limit has almost reached the limit!</p>
            </div>
          </div>
        </div>
      </div>


    </div>

  )
}