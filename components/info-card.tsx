

type CardProps = {
  title: string,
  amount: string
}

export function InfoCard({ amount, title}: CardProps) {


  return (
    <div className="grid col-span-2 md:col-span-1">
      <p className='font-semibold'>{amount} DH</p>
      <p className='font-thin text-sm'>{title}</p>
    </div>
  )
}