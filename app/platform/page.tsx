import Monthlytrans from "@/components/monthly-trans";
export default function Home() {
  return (
    <div className="w-full grid grid-cols-5">
      <div className="col-span-3 border-r border-black p-6">
        <div>
          <h1 className="text-2xl">Transactions</h1>
        </div>
        <Monthlytrans month={new Date}/>
        <Monthlytrans month={new Date}/>
        <Monthlytrans month={new Date}/>
        <Monthlytrans month={new Date}/>
        <Monthlytrans month={new Date}/>

      </div>
    </div>



  )
}