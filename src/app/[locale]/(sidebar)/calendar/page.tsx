import {Calendar} from "@/components/calendar/Calendar";
import {PageBreadcrumb} from "@/components/common/PageBreadCrumb";

export default function Page () {
    return (
        <div className={"size-full"}>
            <PageBreadcrumb pageTitle="Calendar" />
            <Calendar />
        </div>
    )
}