import { Receipt, RefreshCcw } from "lucide-react"


type CardProps = {
  title: string,
  amount: string,
  sent: boolean
}

export function BillCard({ amount, title, sent }: CardProps) {


  return (
    <div className='rounded-md col-span-3 md:col-span-2 w-full h-44 p-4 text-white bg-black'>
      {sent ? <RefreshCcw /> : <Receipt />}
      <p className='text-sm font-thin'>{title}</p>
      <p className='font-normal mt-14'>{amount} DH</p>
      <p className='font-thin text-xs'>/Mo</p>
    </div>
  )
}