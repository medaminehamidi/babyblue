'use client'
import { useSupabase } from '@/components/SupabaseSessionProvider';
import Bills from '@/components/bills';
import Income from '@/components/income';
import Transactions from '@/components/transactions';
import { useEffect } from 'react';
import { useUserStore } from './store';

export default function Home() {
  const { user, supabase } = useSupabase()
  const updateUser = useUserStore((state) => state.updateUser)
  useEffect(() => {
    const fetchUser = async () => {
      const results = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (results?.data && results?.data.at(0)) {
        updateUser({username: results?.data.at(0).username, email: results?.data.at(0).email})
      }
    }
    if (user?.id) fetchUser()
  }, [user?.id])
  return (
    <div className='grid h-24 grid-cols-6'>
      <Income />
      <Bills />
      <Transactions />
    </div>
  )
}
