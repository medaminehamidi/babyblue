'use client'

import { useSupabase } from '@/components/SupabaseSessionProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useCategoryState } from '../store'
import { Separator } from '@/components/ui/separator'
import { Dot, Plus } from 'lucide-react'

export function CategoriesForm() {
  const { user, supabase } = useSupabase()

  useEffect(() => {
    const fetchUser = async () => {
      const results = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (results?.data && results?.data.at(0) && results?.data.at(0).categories) {
        updateCategories([...results?.data.at(0).categories])
      }
    }
    if (user?.id) fetchUser()
  }, [user?.id])

  const categories = useCategoryState((state) => state.categories)
  const updateCategories = useCategoryState((state) => state.updateCategories)
  const onSubmit = async (categories: Array<string>) => {
    const result = await supabase
      .from('profiles')
      .update({ categories: categories })
      .eq('id', user?.id)
    toast({
      description: 'Categories Updated'
    })
  }
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [editing, setEditing] = useState({ index: 499, value: '' })
  return (
    <div>
      <div className='mt-5'>
        <div>
          {domLoaded && <div className="grid grid-cols-3 sm:flex gap-4 items-center text-sm">
            {
              categories.map((category: any, key: any) => {
                return (
                  <div key={key} className='flex'>
                    {editing.index === key
                      ? <>
                        <Input
                          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                          value={editing.value}
                          className='h-5 w-20'
                        />
                        <div onClick={() => {
                          categories[key] = editing.value 
                          updateCategories(editing.value ? categories : categories.filter(Boolean))
                          setEditing({ index: 499, value: '' })
                        }} className="flex rounded cursor-pointer bg-red-100 text-red-500 items-center justify-center">
                          <Dot className="w-5 h-5" />
                        </div>
                      </>
                      : (<>
                        <div onClick={() => setEditing({ index: key, value: category })} className="flex rounded cursor-pointer bg-red-100 mr-2 text-red-500 items-center justify-center">
                          <Dot className="w-5 h-5" />
                        </div>
                        <p className='text-sm w-full'>{category}</p>
                      </>)}
                    {key !== categories.length - 1 && <Separator orientation="vertical" className='h-5 ml-2' />}
                  </div>
                )
              })
            }

            {editing.index === 500
              ? (
                <>
                  <Input
                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    value={editing.value}
                    className='h-5 w-20'
                  />
                  <div onClick={() => {
                    {editing.value && updateCategories([...categories, editing.value])}
                    setEditing({ index: 499, value: '' })
                  }} className="flex rounded cursor-pointer bg-blue-100 mr-2 text-blue-500 items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                </>)
              : (
                <div onClick={() => setEditing({ index: 500, value: '' })} className="flex rounded cursor-pointer bg-blue-100 mr-2 text-blue-500 items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>)}
          </div>}
        </div>
        <Button onClick={() => onSubmit(categories)} className='mt-4 w-fit'>{'Update Categories'}</Button>
      </div>
    </div >
  )
}
