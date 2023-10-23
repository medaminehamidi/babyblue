'use client'

import { useSupabase } from '@/components/SupabaseSessionProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useBalanceStore } from '../store'

export function BalanceForm() {
  const { user, supabase } = useSupabase()

  useEffect(() => {
    const fetchUser = async () => {
      const results = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (results?.data && results?.data.at(0)) {
        setFieldValue('income', results?.data.at(0).income)
        updateBalance({...balance, income: results?.data.at(0).income})
      }
    }
    if (user?.id) fetchUser()
  }, [user?.id])

  const balance = useBalanceStore((state) => state.balance)
  const updateBalance = useBalanceStore((state) => state.updateBalance)
  const onSubmit = async (income: number) => {
    const result = await supabase
      .from('profiles')
      .update({ income: income })
      .eq('id', user?.id)
      updateBalance({...balance, income: income})
    toast({
      description: 'Balance Updated'
    })
  }

  const IncomeSchema = Yup.object().shape({
    income: Yup.number()
  })
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        income: 0
      },
      validationSchema: IncomeSchema,
      onSubmit: (values) => {
        onSubmit(values.income)
      }
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <h3 className='mb-1 mt-3 text-sm font-medium'>Income</h3>
          <Label className='sr-only' htmlFor='income'>
            Income
          </Label>
          <Input
            id='income'
            placeholder='enter your income'
            type='number'
            autoCapitalize='none'
            autoComplete='income'
            autoCorrect='off'
            onChange={handleChange}
            value={values.income}
            className={`${
              errors.income && touched.income ? 'border-rose-500' : ''
            }`}
          />
        </div>
        {errors.income && touched.income ? (
          <p className='text-xs text-rose-500'>{errors.income}</p>
        ) : null}
        
        <Button className='mt-4 w-fit'>{'Update Balance'}</Button>
      </div>
    </form>
  )
}
