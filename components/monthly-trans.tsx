'use client'
import TransactionC2 from "@/components/transaction-c2";
import moment from 'moment'
import { TransactionCard } from "./transaction-card";
import { useTransactionStore } from "@/app/store";
import { toast } from "./ui/use-toast";
import { useSupabase } from "./SupabaseSessionProvider";
import { useEffect, useState } from "react";
type MonthlytransProps = {
    month: Date,
}
const transactionS = [
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },

]
export default function Monthlytrans({ month }: MonthlytransProps) {
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
    return (
        <div className="w-full rounded-md">
            <h1 className="font-light text-lg mt-4">{moment(month).format("D MMMM, YYYY")} </h1>
            {domLoaded && <div>{transactions.map((item, key) => <TransactionCard title={item.title} amount={item.amount} key={key} type={item.type} date={item.date} description={item.description} index={key.toString()} Remove={() => Remove(key, item.id)} />)}</div>} </div>



    )
}