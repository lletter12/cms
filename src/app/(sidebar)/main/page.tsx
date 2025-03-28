import {Metrics} from "@/components/dashboard/Metrics"
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import {MonthlyTop} from "@/components/dashboard/MonthlyTop";

export default function Page() {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <Metrics/>
                <MonthlyChart/>
            </div>
            <div className="col-span-12 xl:col-span-5">
                <MonthlyTop/>
            </div>
        </div>
    )
}