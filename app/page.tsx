import { Input } from '@/components/ui/input';
import { ArrowDownLeft, ArrowUpRight, Bookmark, CreditCard, HelpCircle, LayoutDashboard, Lightbulb, PenSquare, RefreshCcw, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className='grid h-24 grid-cols-6'>
      <div className='w-full text-2xl col-span-3 p-6 font-bold'>
        <h1>MasterCard Gold</h1>
        <div className='w-full flex items-center justify-between'>
          <div>
            <p className='font-semibold mt-8'>6000 dh</p>
            <p className='font-thin text-sm'>Cash Available</p>
          </div>
          <div>
            <p className='font-semibold mt-8'>8000 dh</p>
            <p className='font-thin text-sm'>Cash Limit</p>
          </div>
          <div>
            <p className='font-semibold mt-8'>8000 dh</p>
            <p className='font-thin text-sm'>Dept</p>
          </div>
          <div>
            <p className='font-semibold mt-8'>600 dh</p>
            <p className='font-thin text-sm'>Bills</p>
          </div>
        </div>
        <div className='w-full flex mt-3 items-center rounded-md bg-gray-100 p-4'>
          <div className='mr-10'>
            <p className='font-semibold'>6000 Dh</p>
            <p className='font-thin text-sm'>Total Income</p>
          </div>

          <div>
            <p className='font-semibold'>6000 Dh</p>
            <p className='font-thin text-sm'>Requiring Payments</p>
          </div>
          <div className='rounded-md flex items-center ml-10 cursor-pointer justify-center w-14 h-14 bg-white '>
            <HelpCircle />
          </div>
          <div className='rounded-md flex items-center justify-around cursor-pointer ml-4 w-24 text-sm h-14 bg-black text-white'>
            <PenSquare />
            <p>Edit</p>
          </div>
        </div>
      </div>
      <div className='text-2xl col-span-3 p-6 font-bold'>
        <h1 className='mb-4'>Upcoming Bills</h1>
        <div className='flex items-center justify-between w-full'>
          <div className='rounded-md w-32 h-44 p-4 text-white bg-black'>
            <RefreshCcw />
            <p className='text-sm font-thin'>Spotify</p>
            <p className='font-normal mt-14'>56 Dh</p>
            <p className='font-thin text-xs'>/Mo</p>
          </div>
          <div className='rounded-md w-32 h-44 p-4 text-white bg-black'>
            <LayoutDashboard />
            <p className='text-sm font-thin'>Tinder Gold</p>
            <p className='font-normal mt-14'>56 Dh</p>
            <p className='font-thin text-xs'>/Mo</p>
          </div>
          <div className='rounded-md w-32 h-44 p-4 text-white bg-black'>
            <Lightbulb />
            <p className='text-sm font-thin'>Lights</p>
            <p className='font-normal mt-14'>56 Dh</p>
            <p className='font-thin text-xs'>/Mo</p>
          </div>
        </div>
      </div>
      <div className='w-full text-2xl font-bold col-span-6 p-6'>
        <h1>Transactions</h1>
        <div className='w-full flex items-center justify-between mt-4'>
          <Input placeholder='Filtet Items...' className='w-[320px]' />
          <div className='rounded-md bg-black text-white p-2'>
            <Settings />
          </div>
        </div>
        <div>
          <div className='grid grid-cols-6 mt-3 items-center w-full'>
            <div className='rounded-md text-black w-10 flex items-center justify-center h-10 bg-blue-200'>
              <p className='text-sm'>1</p>
            </div>
            <p className='text-sm'>Money Transfer</p>
            <p className='text-sm'>Issam Lahnikate</p>
            <div className='flex items-center'>
              <p className='text-sm mr-2'>Sent</p>
              <ArrowUpRight className='w-5 h-5 text-red-400' />
            </div>
            <p className='text-sm'>Mon 10 0ct 12:00 PM</p>
            <p className='text-end text-sm'>1000 DH</p>
          </div>
          <div className='grid grid-cols-6 mt-3 items-center w-full'>
            <div className='rounded-md text-black w-10 flex items-center justify-center h-10 bg-blue-200'>
              <p className='text-sm'>1</p>
            </div>
            <p className='text-sm'>E-shopping </p>
            <p className='text-sm'>Mycig</p>
            <div className='flex items-center'>
              <p className='text-sm mr-2'>Sent</p>
              <ArrowUpRight className='w-5 h-5 text-red-400' />
            </div>
            <p className='text-sm'>12:00 PM</p>
            <p className='text-end text-sm'>675 DH</p>
          </div>
          <div className='grid grid-cols-6 mt-3 items-center w-full'>
            <div className='rounded-md text-black w-10 flex items-center justify-center h-10 bg-blue-200'>
              <p className='text-sm'>1</p>
            </div>
            <p className='text-sm'>Bills </p>
            <p className='text-sm'>Spotify</p>
            <div className='flex items-center'>
              <p className='text-sm mr-2'>Sent</p>
              <ArrowUpRight className='w-5 h-5 text-red-400' />
            </div>
            <p className='text-sm'>12:00 PM</p>
            <p className='text-end text-sm'>65 DH</p>
          </div>
          <div className='grid grid-cols-6 mt-3 items-center w-full'>
            <div className='rounded-md text-black w-10 flex items-center justify-center h-10 bg-blue-200'>
              <p className='text-sm'>1</p>
            </div>
            <p className='text-sm'>Money Transfer</p>
            <p className='text-sm'>Snake</p>
            <div className='flex items-center'>
              <p className='text-sm mr-2'>Received</p>
              <ArrowDownLeft className='w-5 h-5 text-green-400' />
            </div>
            <p className='text-sm'>12:00 PM</p>
            <p className='text-end text-sm'>100 DH</p>
          </div>
        </div>
        <div className='flex mt-4 items-center'>
          <div className='rounded-md mr-4 bg-black text-white w-7 flex items-center justify-center h-7'>
            <Bookmark className='w-4 h-4' />
          </div>
          <p className='text-xs text-gray-600 font-light'>you have 1500 DH remaining funds over the next 23 days</p>
        </div>
      </div>
    </div>

  )
}
