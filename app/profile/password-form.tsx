'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function PasswordForm() {
  const onSubmit = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
  }

  const ProfileSchema = Yup.object().shape({
    currentPassword: Yup.string().required('This field is required.'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field is required.')
  })
  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      currentPassword: '',
      password: ''
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      onSubmit(values.password)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <h3 className='mb-1 mt-3 text-sm font-medium'>Current Password</h3>
          <Label className='sr-only' htmlFor='currentPassword'>
            Current Password
          </Label>
          <Input
            id='currentPassword'
            placeholder='enter your Current Password'
            type='password'
            autoCapitalize='none'
            autoComplete='currentPassword'
            autoCorrect='off'
            onChange={handleChange}
            value={values.currentPassword}
            className={`${
              errors.currentPassword && touched.currentPassword
                ? 'border-rose-500'
                : ''
            }`}
          />
        </div>
        {errors.currentPassword && touched.currentPassword ? (
          <p className='text-xs text-rose-500'>{errors.currentPassword}</p>
        ) : null}
        <div className='grid gap-1'>
          <h3 className='mb-1 mt-3 text-sm font-medium'>New Password</h3>
          <Label className='sr-only' htmlFor='password'>
            password
          </Label>
          <Input
            id='password'
            placeholder='enter a valid password'
            type='password'
            autoCapitalize='none'
            autoComplete='password'
            autoCorrect='off'
            onChange={handleChange}
            value={values.password}
            className={`${
              errors.password && touched.password ? 'border-rose-500' : ''
            }`}
          />
        </div>
        {errors.password && touched.password ? (
          <p className='text-xs text-rose-500'>{errors.password}</p>
        ) : null}
        <Button className='mt-4 w-fit'>{'Update Password'}</Button>
      </div>
    </form>
  )
}
