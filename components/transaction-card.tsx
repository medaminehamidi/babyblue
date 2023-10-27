'use client'
import { Dot, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import moment from 'moment'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"

type CardProps = {
  title: string,
  amount: number,
  type: boolean,
  date: Date,
  description: string,
  index: string,
  Remove: any,
  isUpcoming: boolean,
  UpdateTransaction: any
}

export function TransactionCard({ title, amount, type, date, description, isUpcoming, Remove, UpdateTransaction }: CardProps) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className='flex h-full sm:h-10 mt-3 font-semibold sm:flex-row flex-row sm:border-0 border rounded items-center w-full p-2 sm:p-0'>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <div className='rounded text-white w-4 sm:w-10 items-center justify-center h-full bg-black mr-2 cursor-pointer'>
            <p className='text-sm w-10 text-center h-full items-center justify-center hidden sm:flex'>{description[0].toUpperCase()}</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{description} : {amount} DH" from your account
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" className="sm:mt-0 mt-2" variant='secondary' onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit"  variant='destructive' onClick={() => {
              Remove()
              setOpenModal(false)
            }}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="w-full">
        <p className='text-sm'>{description}</p>
        <p className='text-sm font-light hidden sm:block'>{moment(date).format("D MMMM, YYYY")} at {moment(date).format("H:mm A")}</p>
        <p className='text-sm font-light block sm:hidden'>{moment(date).format("DD/MM/YY")}</p>
      </div>
      <div className='w-full  hidden sm:flex items-center'>
        <div className="flex rounded bg-red-100 mr-2 text-red-500 items-center justify-center">
          <Dot className="w-5 h-5" />
        </div>
        <p className='text-sm w-full'>{title}</p>
      </div>
      <p className={`${type ? 'text-red-400' : 'text-[#39b988]'} w-full text-end sm:text-end text-base sm:text-sm`}>{`${type ? '-' : '+'}${amount}`} DH</p>
      <div className="w-full flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled={!isUpcoming}>
              <span className="sr-only">Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={UpdateTransaction}
            >
              Pass Transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}