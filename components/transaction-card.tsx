import { ArrowDownLeft, ArrowUpRight } from "lucide-react"


type CardProps = {
  title: string,
  amount: string,
  type: boolean,
  date: string,
  description: string,
  index: string
}

export function TransactionCard({ title, amount, type, date, description, index }: CardProps) {


  return (
    <div className='grid grid-cols-6 sm:h-10 h-20 mt-3 items-center w-full'>
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
    </div>
  )
}