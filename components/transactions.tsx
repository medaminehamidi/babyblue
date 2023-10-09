'use client'
import { TransactionCard } from '@/components/transaction-card';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { transactions } from '@/public/data';
import { Bookmark, Settings } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

type State = {
  transaction: Array<object>
}
type Action = {
  updateTransaction: (transaction: State['transaction']) => void
}
const useTransactionStore = create<State & Action>((set) => ({
  transaction: [],
  updateTransaction: (transaction) => set(() => ({ transaction: transaction }))
})

)
export default function Transactions() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(false)
  // const [transaction, setTransaction] = useState({
  //   amount: '',
  //   title: '',
  //   type: false,
  //   date: '',
  //   description: '',
  // })
  // useEffect(() => {
  //   console.warn(transaction)

  // }, [transaction])
  const transaction = useTransactionStore((state) => state.transaction)
  const updateTransaction = useTransactionStore((state) => state.updateTransaction)

  return (
    <div className='w-full text-2xl font-bold col-span-6 px-6 pt-6'>
      <h1>Transactions</h1>

      <div className='w-full flex items-center justify-between mt-4'>
        <Input placeholder='Filtet Items...' className='w-[120px] xs:w-[320px]' />

        <Dialog>
          <DialogTrigger asChild>
            <Button className='rounded-md cursor-pointer bg-black text-white p-2'>
              <Settings />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="Title"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  className="col-span-3"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  className="col-span-3"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Sent
                </Label>
                <Checkbox id="type" className='col-span-3'
                  checked={type}
                  onCheckedChange={() => setType(!type)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => updateTransaction([...transaction, {
                amount: amount,
                title: title,
                type: type,
                date: date,
                description: description,
              }])}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {transaction.map((item, key) => <TransactionCard title={item.title} amount={item.amount} key={key} type={item.type} date={item.date} description={item.description} index={key.toString()} />)}
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
