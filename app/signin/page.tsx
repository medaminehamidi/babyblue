import SignIn from '@/components/signin'
import { siteConfig } from '@/config/site'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}

export default function AuthenticationPage() {
  return (
    <div className='container flex items-center justify-center p-6 '>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Signin to your account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password below to access your account
            </p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  )
}
