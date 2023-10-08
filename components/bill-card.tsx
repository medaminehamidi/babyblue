

type CardProps = {
  title: string,
  amount: string,
  Icon: React.ComponentType
}

export function BillCard({ amount, title, Icon }: CardProps) {


  return (
    <div className='rounded-md col-span-3 md:col-span-2 w-full h-44 p-4 text-white bg-black'>
      <Icon />
      <p className='text-sm font-thin'>{title}</p>
      <p className='font-normal mt-14'>{amount} DH</p>
      <p className='font-thin text-xs'>/Mo</p>
    </div>
  )
}