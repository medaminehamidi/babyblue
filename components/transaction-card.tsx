import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react"
import { Button } from "./ui/button"


type CardProps = {
  title: string,
  amount: string,
  type: boolean,
  date: string,
  description: string,
  index: string,
  Remove: any
}

export function TransactionCard({ title, amount, type, date, description, index, Remove }: CardProps) {


  return (
    <div className='grid grid-cols-7 sm:h-10 h-20 mt-3 items-center w-full'>
      <div className='rounded-md text-black w-10 col-span-1 row-span-2 sm:col-span-1 flex items-center justify-center h-full bg-blue-200'>
        <p className='text-sm'>{index}</p>
      </div>
      <p className='text-sm col-span-2 sm:col-span-1'>{title}</p>
      <p className='text-sm col-span-2 sm:col-span-1'>{description}</p>
      <div className='flex items-center col-span-2 sm:col-span-1'>
        <p className='text-sm mr-2'>{type ? 'Sent' : 'Recieved'}</p>
        {type ? <ArrowUpRight className='w-5 h-5 text-red-400' /> : <ArrowDownLeft className='w-5 h-5 text-green-400' />}
      </div>
      <p className='text-sm'>{date}</p>
      <p className='text-end text-sm'>{amount} DH</p>
      <div className="w-full flex items-center justify-end">
        <Button className="w-10 h-10 p-0" onClick={Remove}><Trash2 /></Button>
      </div>
    </div>
  )
}