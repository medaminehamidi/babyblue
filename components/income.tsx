'use client'
import { InfoCard } from '@/components/info-card';
import { amounts, extraInfos } from '@/public/data';
import { HelpCircle, PenSquare } from 'lucide-react';
import { Button } from './ui/button';
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
import { Input } from './ui/input';
import { useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'
type income = {
  amount: string,
  limit: string,

}
type cash = {
  number: string,
  max: string,
  dept: string,
  bills: string
}
type State = {
  income: income,
  cash: cash
}
type Action = {
  updateIncome: (income: State['income']) => void,
  updateCash: (cash: State['cash']) => void
}
const useIncomeStore = create<State & Action>((set) => ({
income: {
  amount: '',
  limit: '',
},
cash: {
  number: '',
  max: '',
  dept: '',
  bills: '',
},
updateCash: (cash) => set(() => ({cash: cash})),
  updateIncome: (income) => set(() => ({ income: income }))
})
)
export default function Income() {
  const [amount, setAmount] = useState('')
  const [limit, setLimit] = useState('')
  const [number, setNumber] = useState('')
  const [max, setMax] = useState('')
  const [dept, setDept] = useState('')
  const [bills, setBills] = useState('')
  const [opensecmodal, setOpensecmodal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const income = useIncomeStore((state) => state.income)
  const cash = useIncomeStore((state) => state.cash)
  const updateCash = useIncomeStore((state) => state.updateCash)
  const updateIncome = useIncomeStore((state) => state.updateIncome)
  const handleSecmodalSubmit = () => {
    setOpensecmodal(false)
updateCash({
  number: number,
  max: max,
  dept: dept,
  bills: bills,

})
  }
  const handleModalSubmit = () => {
  setOpenModal(false)
    updateIncome({
      amount: amount,
      limit: limit,
    })
  }
    return (
      <div className='w-full text-2xl col-span-6 md:col-span-3 p-6 font-bold'>
        <h1>Total Income</h1>
        <div className='w-full mt-6 grid grid-cols-4 md:flex md:items-center md:justify-between cursor-pointer'>
        <InfoCard title='cash amount' amount={cash.number} />
        <InfoCard title='cash limit' amount={cash.max} />
        <InfoCard title='cash dept' amount={cash.dept} />
        <InfoCard title='cash bills' amount={cash.bills} />
          <Dialog open={opensecmodal} onOpenChange={setOpensecmodal}>
                <DialogTrigger asChild>
                  <Button className='rounded-md cursor-pointer bg-black text-white p-2'>
                    <PenSquare />
                    <p>Edit</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>
                      Edit Cash. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Cash Amount
                      </Label>
                      <Input
                        id="Title"
                        className="col-span-3"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Cash Limit
                      </Label>
                      <Input
                        id="date"
                        className="col-span-3"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Dept
                      </Label>
                      <Input
                        id="date"
                        className="col-span-3"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Bills
                      </Label>
                      <Input
                        id="date"
                        className="col-span-3"
                        value={bills}
                        onChange={(e) => setBills(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => handleSecmodalSubmit()}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
        </div>
        <div className='w-full grid grid-cols-2 lg:flex mt-6 items-center rounded-md bg-gray-100 p-4'>
          <div className='flex col-span-2 lg:col-span-1 items-center justify-around w-full'>
          <InfoCard title='cash amount' amount={income.amount} />
          <InfoCard title='cash limit' amount={income.limit} />
          </div>
          <div className='flex col-span-2 mt-4 lg:mt-0 lg:col-span-1 items-center justify-between lg:justify-end w-full'>
            <div className='rounded-md flex items-center ml-0 lg:ml-10 cursor-pointer justify-center w-14 h-14 bg-white '>
              <HelpCircle />
            </div>
            <div className='rounded-md flex items-center justify-around cursor-pointer ml-4 w-24 text-sm h-14 bg-black text-white'>

              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button className='rounded-md cursor-pointer bg-black text-white p-2'>
                    <PenSquare />
                    <p>Edit</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>
                      Edit Cash. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Cash Amount
                      </Label>
                      <Input
                        id="Title"
                        className="col-span-3"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Cash Limit
                      </Label>
                      <Input
                        id="date"
                        className="col-span-3"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => handleModalSubmit()}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    )
  }