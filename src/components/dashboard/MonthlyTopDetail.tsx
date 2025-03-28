export interface MonthlyTopDetailProps {
    source: string
    visitors: string
}

export const MonthlyTopDetail = ({source, visitors}: MonthlyTopDetailProps) => {
    return (
        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
              {source}
            </span>
            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
              {visitors}
            </span>
        </div>
    )
}