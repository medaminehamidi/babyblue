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
import { Bookmark, CircleDashed, Plus, Search } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { useEffect, useState } from 'react';
import { DatePicker } from './ui/date-picker';
import { Transaction, useBalanceStore, useCategoryState, useTransactionStore } from '@/app/store';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useSupabase } from './SupabaseSessionProvider';
import { toast } from './ui/use-toast';
import { calculateTotalLeft } from './income';
import moment from 'moment'

export default function Transactions() {
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState<Date>(new Date)
  const [description, setDescription] = useState('')
  const [type, setType] = useState(false)
  const [isUpcoming, setIsUpcoming] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const transactions = useTransactionStore((state) => state.transaction)
  const balance = useBalanceStore((state) => state.balance)
  const updateTransaction = useTransactionStore((state) => state.updateTransaction)
  const [domLoaded, setDomLoaded] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const timeLeft = moment().isAfter(moment(`${moment().format('MM')}/26/${moment().format('YYYY')}`))
    ? moment.duration(moment(`${moment().add(1, 'M').format('MM')}/26/${moment().format('YYYY')}`).diff(moment())).asDays()
    : moment.duration(moment(`${moment().format('MM')}/26/${moment().format('YYYY')}`).diff(moment())).asDays()
  const handleModalSubmit = () => {
    setTitle('')
    setAmount(0)
    setDescription('')
    setType(false)
    setOpenModal(false)
    onSubmit({
      amount: amount,
      category: title,
      sent: type,
      date: date,
      isUpcoming: isUpcoming,
      beneficiary: description || 'Empty',
    })
  }
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
  const { user, supabase } = useSupabase()

  useEffect(() => {
    const fetchTransactions = async () => {
      const results = await supabase
        .from('transactions')
        .select('*')
        .eq('userid', user?.id)
        .order('date', { ascending: false })
      if (results?.data) {
        const trans = results?.data.map(item => {
          return {
            id: item.id,
            amount: item.amount,
            title: item.category,
            type: item.sent,
            date: item.date,
            description: item.beneficiary,
            isUpcoming: item.isUpcoming,
          }
        })
        updateTransaction([...trans])
      }
    }
    if (user?.id) fetchTransactions()
  }, [user?.id])


  const onSubmit = async (transaction: any) => {
    const result = await supabase
      .from('transactions')
      .insert({ ...transaction, userid: user?.id })
      .select()
    if (result?.data && result?.data.at(0)) {
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
      description: 'Transaction added successfully'
    })
  }
  const categories = useCategoryState((state) => state.categories)
  const [title, setTitle] = useState(categories[0])
  const [filterValue, setFilterValue] = useState('')
  useEffect(() => {
    setFilteredTransactions(transactions)
    setFilterValue('')
  }, [transactions])
const updateFilteredTransactions = () => {
  const filtered = transactions.filter((transaction) => transaction.description.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
  setFilteredTransactions(filtered)
  setFilterValue('')
}
  return (
    <div className='w-full text-2xl font-bold col-span-6 px-6 pt-6'>
      <h1>Transactions</h1>

      <div className='w-full flex items-center justify-between mt-4'>
        <div className='w-full flex items-center justify-start'>
          <Input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder='Filtet Items...' className='w-[120px] xs:w-[320px]' />
          <Button onClick={() => updateFilteredTransactions()} className='rounded-md ml-2 cursor-pointer bg-black text-white p-2'>
            <Search />
          </Button>
        </div>

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
                {/* <Input
                  id="Title"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                /> */}
                <RadioGroup onValueChange={(e) => setTitle(e)} className='grid grid-cols-3 w-72' defaultValue={categories[0]}>
                  {categories.map(category => {
                    return (
                      <div className="flex items-center space-x-2 w-max">
                        <RadioGroupItem value={category} id={category} />
                        <Label className='w-full' htmlFor={category}>{category}</Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Transaction Date
                </Label>
                <DatePicker date={date} setDate={setDate} />
                {/* <Input
                  id="date"
                  className="col-span-3"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                /> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount Transfered
                </Label>
                <Input
                  id="amount"
                  className="col-span-3"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Is Upcoming
                </Label>
                <Checkbox id="type" className='col-span-3'
                  checked={isUpcoming}
                  onCheckedChange={() => setIsUpcoming(!isUpcoming)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleModalSubmit()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {
        domLoaded && (
          <div className='sm:flex sm:flex-col gap-2 grid grid-cols-1 justify-between sm:justify-normal'>
            {filteredTransactions.map((item, key) => <TransactionCard
              title={item.title}
              isUpcoming={item.isUpcoming}
              amount={item.amount}
              key={key}
              type={item.type}
              date={item.date}
              description={item.description}
              index={key.toString()}
              UpdateTransaction={() => UpdateTransaction(key, item.id)}
              Remove={() => Remove(key, item.id)}
            />)}

            {!filteredTransactions.length && (
              <div className='my-4 w-full flex items-center justify-center'>
                <CircleDashed className='mr-4' />
                <p className='text-sm font-light'>No transactions available</p>
              </div>
            )}

          </div>)
      }
      <div className='flex mt-4 mb-20 items-center'>
        <div className='rounded-md mr-4 bg-black text-white w-7 flex items-center justify-center h-7'>
          <Bookmark className='w-4 h-4' />
        </div>
        {domLoaded && <p className='text-xs text-gray-600 font-light'>you have {calculateTotalLeft(transactions, balance.income).toLocaleString()} DH remaining funds over the next {timeLeft.toFixed(0)} days</p>}
      </div>
    </div >
  )
}
