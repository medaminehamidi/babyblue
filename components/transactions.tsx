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
import { Bookmark, CircleDashed, Plus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
type Transaction = {
  title: string,
  amount: string,
  type: boolean,
  date: string,
  description: string
}

type State = {
  transaction: Array<Transaction>
}
type Action = {
  updateTransaction: (transaction: State['transaction']) => void
}

const useTransactionStore = create(
  persist<State & Action>(
    (set) => ({
      transaction: [],
      updateTransaction: (transaction) => set(() => ({ transaction: transaction }))
    }),
    {
      name: 'transaction', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export default function Transactions() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const transaction = useTransactionStore((state) => state.transaction)
  const updateTransaction = useTransactionStore((state) => state.updateTransaction)
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleModalSubmit = () => {
    setTitle('')
    setAmount('')
    setDate('')
    setDescription('')
    setType(false)
    setOpenModal(false)
    updateTransaction([...transaction, {
      amount: amount,
      title: title,
      type: type,
      date: date,
      description: description,
    }])
  }
  const Remove = (index: number) => {
    if (transaction.length > 1) {
      transaction.splice(index, 1)
      updateTransaction([...transaction])
    } else {
      updateTransaction([])
    }

  }
  return (
    <div className='w-full text-2xl font-bold col-span-6 px-6 pt-6'>
      <h1>Transactions</h1>

      <div className='w-full flex items-center justify-between mt-4'>
        <Input placeholder='Filtet Items...' className='w-[120px] xs:w-[320px]' />

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className='rounded-md cursor-pointer bg-black text-white p-2'>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Fill transaction infos here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Transaction Type
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
                  Transaction Date
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
                  Amount Transfered
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
                  Beneficiary
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
                  {type ? 'Sent' : 'Recieved'}
                </Label>
                <Checkbox id="type" className='col-span-3'
                  checked={type}
                  onCheckedChange={() => setType(!type)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleModalSubmit()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {domLoaded && (
        <div>
          {transaction.map((item, key) => <TransactionCard title={item.title} amount={item.amount} key={key} type={item.type} date={item.date} description={item.description} index={key.toString()} Remove={() => Remove(key)} />)}

          {!transaction.length && (
            <div className='my-4 w-full flex items-center justify-center'>
              <CircleDashed className='mr-4' />
              <p className='text-sm font-light'>No transactions available</p>
            </div>
          )}

        </div>)}
      <div className='flex mt-4 mb-20 items-center'>
        <div className='rounded-md mr-4 bg-black text-white w-7 flex items-center justify-center h-7'>
          <Bookmark className='w-4 h-4' />
        </div>
        <p className='text-xs text-gray-600 font-light'>you have 1500 DH remaining funds over the next 23 days</p>
      </div>
    </div>
  )
}
