import moment from 'moment'
import { Dot } from "lucide-react";
type TransactionC2Props = {
    beneficiary: string,
    date: Date,
    subCat: string,
    amount: number

}
export default function TransactionC2({ beneficiary, date, subCat, amount }: TransactionC2Props) {
    return (
        <div className="py-6 rounded w-full h-16 px-2 items-center flex justify-between">
            <div className="w-full">
                <h1 className="font-bold text-base">{beneficiary}</h1>
                <p className="font-light text-sm">{moment(date).format("D MMMM, YYYY")} at {moment(date).format("H:mm A")}</p>
            </div>
            <div className="flex items-center w-full">
                <Dot className="text-red-600 border rounded-sm bg-gray-100 font-semibold" />
                <p className="font-semibold ml-1">{subCat}</p>
            </div>
            <p className="text-red-500 w-full text-end">{amount} DH</p>
        </div>
    )
}