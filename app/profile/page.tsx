'use client'
import { useSupabase } from '@/components/SupabaseSessionProvider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { useRouter } from 'next/navigation'
import { PasswordForm } from './password-form'
import { ProfileForm } from './profile-form'
import { BalanceForm } from './balance-form'
import { CategoriesForm } from './categories'

export default function SettingsProfilePage() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  return (
    <div className='p-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
      </div>
      <Separator />
      <ProfileForm />
      <div className='mt-8' >
        <h3 className='text-lg font-medium'>Balance</h3>
      </div>
      <Separator />
      <BalanceForm />
      <div className='mt-8' >
        <h3 className='text-lg font-medium'>Categories</h3>
      </div>
      <Separator />
      <CategoriesForm />
      <div className='flex items-center justify-between mt-2'>
        <Button
          variant='outline'
          onClick={() => {
            supabase.auth.signOut()
            router.push(siteConfig.links.signin)
          }}
        >
          logout
        </Button>
      </div>
    </div>
  )
}
