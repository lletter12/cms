import {MonthlyTopItem} from "@/components/dashboard/MonthlyTopItem";
import {useTranslations} from "next-intl";

export const MonthlyTop = () => {

    const t = useTranslations("Main");

    const items = [
        {
            id: "0",
            header: t("text.topBanners.label"),
            items: [
                {source: "Banner1", visitors: "10K"},
                {source: "Banner2", visitors: "5K"},
                {source: "Banner3", visitors: "2.5K"},
                {source: "Banner4", visitors: "2K"}
            ]
        }, {
            id: "1",
            header: t("text.topModals.label"),
            items: [
                {source: "Modal1", visitors: "8K"},
                {source: "Modal2", visitors: "7K"},
                {source: "Modal3", visitors: "5K"},
                {source: "Modal4", visitors: "2K"}
            ]
        }]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {items.map((value) =>
                <MonthlyTopItem key={value.id} header={value.header} items={value.items}/>
            )}
        </div>
    )
}