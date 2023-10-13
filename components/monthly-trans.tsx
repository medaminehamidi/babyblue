import TransactionC2 from "@/components/transaction-c2";
import moment from 'moment'
type MonthlytransProps = {
    month: Date,
}
const transactionS = [
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },
    {
        beneficiary: "fiat",
        date: new Date,
        subCat: "Fashion",
        amount: 200.00
    },

]
export default function Monthlytrans({ month }: MonthlytransProps) {
    return (
        <div className="w-full rounded-md">
            <h1 className="font-light text-lg mt-4">{moment(month).format("D MMMM, YYYY")} </h1>
            {transactionS.map((item,key) => <TransactionC2 beneficiary={item.beneficiary} key={key} date={item.date} subCat={item.subCat} amount={item.amount} />)}
        </div>



    )
}