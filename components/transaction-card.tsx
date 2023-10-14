import { ArrowDownLeft, ArrowUpRight, Dot, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { format, parseISO } from "date-fns"
import moment from 'moment'

type CardProps = {
  title: string,
  amount: number,
  type: boolean,
  date: Date,
  description: string,
  index: string,
  Remove: any
}

export function TransactionCard({ title, amount, type, date, description, index, Remove }: CardProps) {
  return (
    <div className='flex h-full sm:h-10 mt-3 font-semibold sm:flex-row flex-col sm:border-0 border rounded items-center w-full p-2 sm:p-0'>
      <div className='rounded text-white w-10 hidden sm:flex items-center justify-center h-full bg-black mr-2 cursor-pointer' onClick={Remove}>
        <p className='text-sm w-10 text-center'>{description[0].toUpperCase()}</p>
      </div>
      <div className="w-full">
        <p className='text-sm'>{description}</p>
        <p className='text-sm font-light hidden sm:block'>{moment(date).format("D MMMM, YYYY")} at {moment(date).format("H:mm A")}</p>
        <p className='text-sm font-light block sm:hidden'>{moment(date).format("DD/MM/YY")}</p>
      </div>
      <div className='w-full  hidden sm:flex items-center'>
        <div className="flex rounded bg-red-100 mr-2 text-red-500 items-center justify-center">
          <Dot className="w-5 h-5" />
        </div>
        <p className='text-sm w-full'>{title}</p>
      </div>
      <p className={`${type ? 'text-red-400' : 'text-[#39b988]'} w-full text-start sm:text-end text-base mt-4 sm:mt-0 sm:text-sm`}>{`${type ? '-' : '+'}${amount}`} DH</p>
      {/* <div className="w-full flex items-center justify-end">
        <Button className="w-10 h-10 p-0" onClick={Remove}><Trash2 /></Button>
      </div> */}
    </div>
  )
}