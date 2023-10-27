'use client'
import moment from 'moment'
import { TransactionCard } from "./transaction-card";
import { useTransactionStore } from "@/app/store";
import { toast } from "./ui/use-toast";
import { useSupabase } from "./SupabaseSessionProvider";
import { useEffect, useState } from "react";
type MonthlytransProps = {
  month: any,
  itemTransactions: any
}
export default function Monthlytrans({ month, itemTransactions }: MonthlytransProps) {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const transactions = useTransactionStore((state) => state.transaction)
  const updateTransaction = useTransactionStore((state) => state.updateTransaction)
  const { supabase } = useSupabase()

  const Remove = async (index: number, id: any) => {
    if (transactions.length > 1) {
      transactions.splice(index, 1)
      updateTransaction([...transactions])
    } else {
      updateTransaction([])
    }
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    toast({
      description: 'Transaction Removed successfully'
    })
  }
  const UpdateTransaction = async (index: any, id: any) => {
    const result = await supabase
      .from('transactions')
      .update({ isUpcoming: false })
      .eq('id', id)
      .select()
    if (result?.data && result?.data.at(0)) {
      transactions.splice(index, 1)
      updateTransaction([{
        id: result?.data.at(0).id,
        amount: result?.data.at(0).amount,
        title: result?.data.at(0).category,
        type: result?.data.at(0).sent,
        date: result?.data.at(0).date,
        description: result?.data.at(0).beneficiary || 'Empty',
        isUpcoming: result?.data.at(0).isUpcoming
      }, ...transactions,])
    }
    toast({
      description: 'Transaction Updated successfully'
    })
  }
  return (
    <div className="w-full rounded-md">
      <h1 className="font-light text-lg mt-4">{month} </h1>
      {domLoaded && <div>{itemTransactions.map((item: any, key: any) => <TransactionCard
        title={item.title}
        amount={item.amount}
        isUpcoming={item.isUpcoming}
        key={key}
        type={item.type}
        date={item.date}
        description={item.description}
        index={key.toString()}
        UpdateTransaction={() => UpdateTransaction(key, item.id)}
        Remove={() => Remove(key, item.id)}
      />)}</div>}
    </div>



  )
}