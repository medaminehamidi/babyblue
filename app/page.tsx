import Bills from '@/components/bills';
import Income from '@/components/income';
import Transactions from '@/components/transactions';

export default function Home() {
  return (
    <div className='grid h-24 grid-cols-6'>
      <Income />
      <Bills />
      <Transactions />
    </div>
  )
}
