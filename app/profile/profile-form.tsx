'use client'

import { useSupabase } from '@/components/SupabaseSessionProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useUserStore } from '../store'

export function ProfileForm() {
  const { user, supabase } = useSupabase()

  useEffect(() => {
    const fetchUser = async () => {
      const results = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (results?.data && results?.data.at(0)) {
        setFieldValue('fullname', results?.data.at(0).username)
        updateUser({...currentUser, username: results?.data.at(0).username})
      }
    }
    if (user?.id) fetchUser()
  }, [user?.id])

  const currentUser = useUserStore((state) => state.user)
  const updateUser = useUserStore((state) => state.updateUser)
  const onSubmit = async (fullname: string) => {
    const result = await supabase
      .from('profiles')
      .update({ username: fullname })
      .eq('id', user?.id)
      updateUser({...currentUser, username: fullname})
    toast({
      description: 'Profile Updated'
    })
  }

  const ProfileSchema = Yup.object().shape({
    fullname: Yup.string().required('This field is required.')
  })
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        fullname: ''
      },
      validationSchema: ProfileSchema,
      onSubmit: (values) => {
        onSubmit(values.fullname)
      }
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <h3 className='mb-1 mt-3 text-sm font-medium'>Username</h3>
          <Label className='sr-only' htmlFor='fullname'>
            Username
          </Label>
          <Input
            id='fullname'
            placeholder='enter your username'
            type='fullname'
            autoCapitalize='none'
            autoComplete='fullname'
            autoCorrect='off'
            onChange={handleChange}
            value={values.fullname}
            className={`${
              errors.fullname && touched.fullname ? 'border-rose-500' : ''
            }`}
          />
        </div>
        {errors.fullname && touched.fullname ? (
          <p className='text-xs text-rose-500'>{errors.fullname}</p>
        ) : null}
        
        <Button className='mt-4 w-fit'>{'Update Profile'}</Button>
      </div>
    </form>
  )
}
