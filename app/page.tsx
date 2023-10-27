'use client'
import { useSupabase } from '@/components/SupabaseSessionProvider';
import Bills from '@/components/bills';
import Income from '@/components/income';
import Transactions from '@/components/transactions';
import { useEffect, useState } from 'react';
import { useBalanceStore, useCategoryState, useUserStore } from './store';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, supabase } = useSupabase()
  const updateUser = useUserStore((state) => state.updateUser)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!user && !isLoading) {
      redirect('/signin')
    }
  }, [user])

  const balance = useBalanceStore((state) => state.balance)
  const updateBalance = useBalanceStore((state) => state.updateBalance)
  
  const updateCategories = useCategoryState((state) => state.updateCategories)
  useEffect(() => {
    setIsLoading(true)
    const fetchUser = async () => {
      const results = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (results?.data && results?.data.at(0)) {
        updateBalance({...balance, income: results?.data.at(0).income})
        
        updateCategories([...results?.data.at(0).categories])
        setIsLoading(false)
        updateUser({ username: results?.data.at(0).username, email: results?.data.at(0).email })
      } else{
        
        setIsLoading(false)
      }
    }
    if (user?.id) fetchUser()
  }, [user?.id])
  return (
    <div className='grid grid-cols-6'>
      <Income />
      <Bills />
      <Transactions />
    </div>
  )
}
